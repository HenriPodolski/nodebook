import { ofType } from 'redux-observable';
import { switchMap, withLatestFrom } from 'rxjs/internal/operators';
import {
    INPUT_EXECUTE_FLAG_CHANGE
} from '../actions/input/input.actions';
import { updateAction } from '../actions/output/outputs.actions';
import {
    executeFlagChangeAction,
    INPUTS_EXECUTE_FLAG_CHANGE,
    validationErrorsChangeAction
} from '../actions/input/inputs.actions';
import { process } from '../services/processors/processor.service';
import { InputEnums } from '../enums/input.enums';
import { OutputEnums } from '../enums/output.enums';

export const dirtyExecuteFlagOutputEpic = (action$, state$) => action$.pipe(
    ofType(INPUT_EXECUTE_FLAG_CHANGE, INPUTS_EXECUTE_FLAG_CHANGE),
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

        actions.push(updateAction(processed));

        return actions;
    }));

export const newOutputEpic = (action$, state$) => action$.pipe(
    ofType(INPUT_EXECUTE_FLAG_CHANGE, INPUTS_EXECUTE_FLAG_CHANGE),
    withLatestFrom(state$),
    switchMap(([action, state]) => {

        let processed: any[] = [];
        let actions: { type: string; payload: any; }[] = [];

        state.inputs.forEach((input, index) => {
            let validationErrors: {message: string}[] = [];
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

            console.group('newOutputEpic ' + input.id + ': ' + input.name);
            console.log(action);
            console.log(state);
            console.log('isValidFilename ', isValidFilename);
            console.log('isUnique ', isUnique);
            console.groupEnd();

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

                actions.push(executeFlagChangeAction(InputEnums.executeFlags.processed, index));

                const processResult = process(input);

                processed.push({
                    id: input.id,
                    name: input.name,
                    mode: input.mode,
                    context: input.context,
                    value: input.value,
                    executeFlag: OutputEnums.executeFlags.processed,
                    logs: processResult.out,
                    file: processResult.file
                });
            }
        });

        actions.push(updateAction(processed));

        return actions;
    })
);