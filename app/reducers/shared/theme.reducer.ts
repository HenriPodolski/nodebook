import { INPUT_THEME_CHANGE } from '../../actions/input/input.actions';
import { actionWithPayload } from '../../actions/index';
import { rootState } from '../../store/state';
import { INPUTS_THEME_CHANGE } from '../../actions/input/inputs.actions';

export function inputThemeReducer(
    state: string = rootState.inputs[0].theme,
    action: actionWithPayload<string>
) {
    switch (action.type) {
        case INPUT_THEME_CHANGE:
        case INPUTS_THEME_CHANGE:
            return action.payload;
        default:
            return state;
    }
}