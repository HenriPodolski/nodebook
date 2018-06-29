import { EDITOR_THEME_CHANGE } from '../../actions/editor/editor.actions';
import { actionWithPayload } from '../../actions/index';
import { rootState } from '../../store/state';

export function editorThemeReducer(
    state: string = rootState.editors[0].theme,
    action: actionWithPayload
) {
    switch (action.type) {
        case EDITOR_THEME_CHANGE:
            return action.payload;
        default:
            return state;
    }
}