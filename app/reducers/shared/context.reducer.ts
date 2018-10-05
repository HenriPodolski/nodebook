import { actionWithPayload } from '../../actions/index';
import { rootState } from '../../store/state';
import { INPUTS_CONTEXT_CHANGE } from '../../actions/input/inputs.actions';

export function inputContextReducer(
    state: string = rootState.inputs[0].context,
    action: actionWithPayload<string>
) {
    switch (action.type) {
        case INPUTS_CONTEXT_CHANGE:
            return action.payload;
        default:
            return state;
    }
}