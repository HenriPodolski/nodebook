import { actionWithPayload } from '../../actions/index';
import { INPUTS_THEME_CHANGE } from '../../actions/input/inputs.actions';

export function inputThemeReducer(
    state: string,
    action: actionWithPayload<string>
) {
    switch (action.type) {
        case INPUTS_THEME_CHANGE:
            return action.payload;
        default:
            return state;
    }
}