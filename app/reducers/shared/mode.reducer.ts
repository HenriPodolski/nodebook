import { INPUT_MODE_CHANGE } from '../../actions/input/input.actions';
import { actionWithPayload } from '../../actions/index';
import { rootState } from '../../store/state';
import { INPUTS_MODE_CHANGE } from '../../actions/input/inputs.actions';

export function inputModeReducer(
    state: string = rootState.inputs[0].mode,
    action: actionWithPayload<string>
) {
    switch (action.type) {
        case INPUT_MODE_CHANGE:
        case INPUTS_MODE_CHANGE:
            return action.payload;
        default:
            return state;
    }
}