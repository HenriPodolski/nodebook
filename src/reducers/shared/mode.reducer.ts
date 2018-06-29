import { EDITOR_MODE_CHANGE } from '../../actions/editor/editor.actions';
import { actionWithPayload } from '../../actions/index';
import { rootState } from '../../store/state';

export function editorModeReducer(
    state: string = rootState.editors[0].mode,
    action: actionWithPayload
) {
    switch (action.type) {
        case EDITOR_MODE_CHANGE:
            return action.payload;
        default:
            return state;
    }
}