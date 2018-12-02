import { actionWithPayload } from '../../actions/index';
import { INPUTS_CONTEXT_CHANGE } from '../../actions/input/inputs.actions';

export function inputContextReducer(
    state: string,
    action: actionWithPayload<string>
) {
    switch (action.type) {
        case INPUTS_CONTEXT_CHANGE:
            return action.payload;
        default:
            return state;
    }
}