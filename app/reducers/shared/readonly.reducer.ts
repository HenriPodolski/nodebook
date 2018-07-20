import { INPUT_READONLY_CHANGE } from '../../actions/input/input.actions';
import { actionWithPayload } from '../../actions/index';
import { rootState } from '../../store/state';
import { INPUTS_READONLY_CHANGE } from '../../actions/input/inputs.actions';

export function inputReadonlyReducer(
    state: boolean = rootState.inputs[0].readOnly as boolean,
    action: actionWithPayload<boolean>
) {
    switch (action.type) {
        case INPUT_READONLY_CHANGE:
        case INPUTS_READONLY_CHANGE:
            return action.payload;
        default:
            return state;
    }
}