import { actionWithPayload } from '../../actions/index';
import { INPUTS_EXECUTE_FLAG_CHANGE } from '../../actions/input/inputs.actions';

export function inputsExecuteFlagReducer(
    state: string,
    action: actionWithPayload<string>
) {
    switch (action.type) {
        case INPUTS_EXECUTE_FLAG_CHANGE:
            return action.payload;
        default:
            return state;
    }
}