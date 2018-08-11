import { ofType } from 'redux-observable';
import { map, withLatestFrom } from 'rxjs/internal/operators';
import { INPUT_EXECUTE_FLAG_CHANGE } from '../actions/input/input.actions';
import { updateAction } from '../actions/output/outputs.actions';
import { actionWithPayload } from '../actions';
import { INPUTS_EXECUTE_FLAG_CHANGE } from '../actions/input/inputs.actions';

export const newOutputEpic = (action$, state$) => action$.pipe(
    ofType(INPUT_EXECUTE_FLAG_CHANGE, INPUTS_EXECUTE_FLAG_CHANGE),
    withLatestFrom(state$),
    map((action: actionWithPayload<string>) => {

        const processInputs = state$.value.inputs.filter(input => input.executeFlag === 'processed');

        const processed = processInputs.map(processInput => {
            return {
                id: processInput.id,
                mode: processInput.mode,
                value: processInput.value,
                output: '...',
                todo: 'TODO: process these values with mode switch processor to process value!!!'
            };
        });

        return updateAction(processed);
    })
);