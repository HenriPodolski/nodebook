import { ofType } from 'redux-observable';
import { map, withLatestFrom } from 'rxjs/internal/operators';
import { INPUT_EXECUTE_FLAG_CHANGE } from '../actions/input/input.actions';
import {
    INPUTS_EXECUTE_FLAG_CHANGE, newAction,
    stateAction
} from '../actions/input/inputs.actions';
import { environment } from '../environments/environment';
import { actionWithPayload } from '../actions';

export const newInputEpic = (action$, state$) => action$.pipe(
    ofType(INPUT_EXECUTE_FLAG_CHANGE, INPUTS_EXECUTE_FLAG_CHANGE),
    withLatestFrom(state$),
    map((action: actionWithPayload<string>) => {

        console.log('newInputEpic', action);

        const unprocessed = state$.value.inputs.filter(input => input.executeFlag !== 'processed');

        if (unprocessed.length === 0) {
            return newAction({...environment.config.input.editableConfig});
        } else {
            return stateAction();
        }
    })
);