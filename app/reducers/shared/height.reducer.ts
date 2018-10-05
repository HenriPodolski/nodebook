import { actionWithPayload } from '../../actions/index';
import { rootState } from '../../store/state';
import { INPUTS_HEIGHT_CHANGE } from '../../actions/input/inputs.actions';

export function inputHeightReducer(
    state: string = rootState.inputs[0].height,
    action: actionWithPayload<string>
) {
    switch (action.type) {
        case INPUTS_HEIGHT_CHANGE:
            return action.payload;
        default:
            return state;
    }
}