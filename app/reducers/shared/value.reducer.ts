import { actionWithPayload } from '../../actions/index';
import { INPUTS_VALUE_CHANGE } from '../../actions/input/inputs.actions';

export function inputValueReducer(
    state: string,
    action: actionWithPayload<string>
) {
    switch (action.type) {
        case INPUTS_VALUE_CHANGE:
            return action.payload;
        default:
            return state;
    }
}