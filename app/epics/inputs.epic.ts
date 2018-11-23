import { ofType } from 'redux-observable';
import { debounceTime, map, withLatestFrom } from 'rxjs/internal/operators';
import {
	contextChangeAction,
	INPUTS_EXECUTE_FLAG_CHANGE, INPUTS_MODE_CHANGE, newAction,
	stateAction
} from '../actions/input/inputs.actions';
import { environment } from '../environments/environment';
import { InputEnums } from '../enums/input.enums';

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
        } else  {
            // set default context
            const defaultContext = contextModeDefaultSetting.values[0];
            return contextChangeAction(defaultContext.value, action.id);
        }
    })
);