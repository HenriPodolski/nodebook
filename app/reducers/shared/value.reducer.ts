import { INPUT_VALUE_CHANGE } from '../../actions/input/input.actions';
import { actionWithPayload } from '../../actions/index';
import { rootState } from '../../store/state';
import { INPUTS_VALUE_CHANGE } from '../../actions/input/inputs.actions';

export function inputValueReducer(
    state: string = rootState.inputs[0].value,
    action: actionWithPayload<string>
) {
    switch (action.type) {
        case INPUT_VALUE_CHANGE:
        case INPUTS_VALUE_CHANGE:
            return action.payload;
        default:
            return state;
    }
}