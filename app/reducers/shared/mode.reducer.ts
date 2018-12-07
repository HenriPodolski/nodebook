import { actionWithPayload } from '../../actions/index';
import { INPUTS_MODE_CHANGE } from '../../actions/input/inputs.actions';

export function inputModeReducer(
    state: string,
    action: actionWithPayload<string>
) {
    switch (action.type) {
        case INPUTS_MODE_CHANGE:
            return action.payload;
        default:
            return state;
    }
}