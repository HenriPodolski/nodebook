import { INPUT_NAME_CHANGE } from '../../actions/input/input.actions';
import { actionWithPayload } from '../../actions/index';
import { rootState } from '../../store/state';
import { INPUTS_NAME_CHANGE } from '../../actions/input/inputs.actions';

export function inputNameReducer(
    state: string = rootState.inputs[0].name,
    action: actionWithPayload<string>
) {
    switch (action.type) {
        case INPUT_NAME_CHANGE:
        case INPUTS_NAME_CHANGE:
            return action.payload;
        default:
            return state;
    }
}