import { actionWithPayload } from '../../actions/index';
import { INPUTS_HEIGHT_CHANGE } from '../../actions/input/inputs.actions';

export function inputHeightReducer(
    state: string,
    action: actionWithPayload<string>
) {
    switch (action.type) {
        case INPUTS_HEIGHT_CHANGE:
            return action.payload;
        default:
            return state;
    }
}