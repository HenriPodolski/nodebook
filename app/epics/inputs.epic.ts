import { ofType } from 'redux-observable';
import { debounceTime, map, switchMap, withLatestFrom } from 'rxjs/internal/operators';
import {
  contextChangeAction, executeFlagChangeAction, INPUTS_DELETE,
  INPUTS_EXECUTE_FLAG_CHANGE, INPUTS_MODE_CHANGE, INPUTS_REORDER, newAction,
  stateAction
} from '../actions/input/inputs.actions';
import { environment } from '../environments/environment';
import { InputEnums } from '../enums/input.enums';
import { deleteAction } from '../actions/output/outputs.actions';

export const markInputsForExecutionEpic = (action$, state$) => action$.pipe(
  ofType(INPUTS_REORDER, INPUTS_DELETE),
  withLatestFrom(state$),
  switchMap(([action, state]) => {

    let newExecutionFromId = -1;
    let actions: { type: string; payload?: any; }[] = [];

    if (action.type === INPUTS_REORDER) {
      newExecutionFromId = Math.min(action.payload.sourceId, action.payload.targetId);
    } else if (action.type === INPUTS_DELETE) {
      newExecutionFromId = action.id - 1;
    }

    while (state.inputs[newExecutionFromId] &&
           state.inputs[newExecutionFromId].executeFlag !== InputEnums.executeFlags.idle) {
      // delete output because of old file infos
      actions.push(deleteAction(
        {id: newExecutionFromId}
      ));
      // reset input flag
      actions.push(executeFlagChangeAction(
        InputEnums.executeFlags.processing, newExecutionFromId)
      );
      newExecutionFromId++;
    }

    if (actions.length === 0) {
      actions.push(stateAction());
    }

    return actions;
  })
);

export const newInputEpic = (action$, state$) => action$.pipe(
  ofType(INPUTS_EXECUTE_FLAG_CHANGE),
  withLatestFrom(state$),
  debounceTime(300),
  map(([action, state]) => {

    console.log('newInputEpic', action);

    const idle = state.inputs.filter(
      input => input.executeFlag === InputEnums.executeFlags.idle
    );

    if (idle.length === 0) {
      return newAction({...environment.config.input.editableConfig});
    } else {
      return stateAction();
    }
  })
);

export const contextInputEpic = (action$, state$) => action$.pipe(
  ofType(INPUTS_MODE_CHANGE),
  withLatestFrom(state$),
  map(([action, state]) => {
    // get possible contexts for a mode and use the first one as default
    const contextModeDefaultSetting = [...environment.config.input.contexts].filter((context) => {
      return state.inputs[action.id].mode === context.mode
    })[0];
    const hasDefaultContext = (
      contextModeDefaultSetting &&
      contextModeDefaultSetting.values &&
      contextModeDefaultSetting.values[0] &&
      contextModeDefaultSetting.values[0].value
    );
    // reset if no contexts available
    if (!hasDefaultContext) {
      return contextChangeAction('', action.id);
    } else {
      // set default context
      const defaultContext = contextModeDefaultSetting.values[0];
      return contextChangeAction(defaultContext.value, action.id);
    }
  })
);