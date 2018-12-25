import { ofType } from 'redux-observable';
import { switchMap, withLatestFrom } from 'rxjs/internal/operators';
import { OUTPUTS_UPDATE, stateAction, updateAction } from '../actions/output/outputs.actions';
import {
  executeFlagChangeAction,
  INPUTS_EXECUTE_FLAG_CHANGE,
  validationErrorsChangeAction
} from '../actions/input/inputs.actions';
import { ProcessorService } from '../services/processors/processor.service';
import { InputEnums } from '../enums/input.enums';
import { OutputEnums } from '../enums/output.enums';
import * as fs from 'fs';
import { PackageJsonService } from '../services/files/package-json.service';

export const outputsUpdateEpic = (action$, state$) => action$.pipe(
  ofType(OUTPUTS_UPDATE),
  withLatestFrom(state$),
  switchMap(([action, state]) => {

    let actions: { type: string; payload?: any; }[] = [];
    PackageJsonService.updateNodebookNodes(state.outputs);

    console.log('outputsUpdateEpic', action);
    actions.push(stateAction());
    return actions;
  })
);

export const dirtyExecuteFlagOutputEpic = (action$, state$) => action$.pipe(
  ofType(INPUTS_EXECUTE_FLAG_CHANGE),
  withLatestFrom(state$),
  switchMap(([action, state]) => {
    let processed: any[] = [];
    let actions: { type: string; payload: any; }[] = [];

    state.inputs.forEach((input, index) => {
      // if input was set to idle and output is already there
      const isIdle = input.executeFlag === InputEnums.executeFlags.idle;

      if (isIdle && state.outputs[index]) {
        // set output executeFlag to dirty
        const newOutputState = Object.assign(
          {},
          state.outputs[index],
          {
            executeFlag: OutputEnums.executeFlags.dirty
          });
        processed.push(newOutputState);
      }
    });

    if (processed.length) {
      actions.push(updateAction(processed));
    }

    return actions;
  }));

export const newOutputEpic = (action$, state$) => action$.pipe(
  ofType(INPUTS_EXECUTE_FLAG_CHANGE),
  withLatestFrom(state$),
  switchMap(([action, state]) => {

    let processed: any[] = [];
    let actions: { type: string; payload: any; }[] = [];
    const index = action.id;
    const input = state.inputs[index];
    const output = state.outputs[index];

    let validationErrors: { message: string }[] = [];
    const isProcessing = input.executeFlag === InputEnums.executeFlags.processing;
    // tslint:disable
    const isValidFilename = /^(?!\.)(?!com[0-9]$)(?!con$)(?!lpt[0-9]$)(?!nul$)(?!prn$)[^\|\*\?\\:<>/$"]*[^\.\|\*\?\\:<>/$"]+$/
      .test(input.name);
    // tslint:enable
    const isUnique = !(state
      .inputs
      .filter(filteredInput => {
        return filteredInput.id !== input.id &&
          filteredInput.name === input.name &&
          filteredInput.mode === input.mode &&
          (!input.context || filteredInput.context === input.context)
      })
      .length);
    const isValidName = isValidFilename && isUnique;

    if (!isValidFilename && isProcessing) {
      console.log('filename not valid');
      validationErrors.push({message: 'filename not valid'});
    }

    if (isValidFilename && !isUnique && isProcessing) {
      console.log('filename not unique');
      validationErrors.push({message: 'filename not unique'});
    }

    if (validationErrors.length) {
      actions.push(validationErrorsChangeAction({
        filename: validationErrors
      }, index));

      actions.push(executeFlagChangeAction(InputEnums.executeFlags.idle, index));
    }

    if (isProcessing && isValidName) {

      actions.push(validationErrorsChangeAction({
        filename: []
      }, index));

      const processResult = ProcessorService.process(input, state);
      const outputData: any = {
        id: input.id,
        name: input.name,
        mode: input.mode,
        context: input.context,
        value: input.value,
        executeFlag: OutputEnums.executeFlags.processed,
        logs: processResult.out,
        file: processResult.file,
        infos: processResult.infos
      };

      if (processResult.compiledFile) {
        outputData.compiledFile = processResult.compiledFile;
      }

      // rename files via deleting the existing
      if (output && output.infos &&
        processResult.infos &&
        processResult.infos.absoluteFilePath !== output.infos.absoluteFilePath &&
        fs.existsSync(output.infos.absoluteFilePath)) {
        fs.unlinkSync(output.infos.absoluteFilePath);
      }

      processed.push(outputData);
    }

    if (processed.length) {
      actions.push(updateAction(processed));

      for (let i = 0; i < processed.length; i++) {
        actions.push(executeFlagChangeAction(InputEnums.executeFlags.processed, i));
      }
    }

    return actions;
  })
);

