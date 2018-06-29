import { EDITOR_HEIGHT_CHANGE } from '../../actions/editor/editor.actions';
import { actionWithPayload } from '../../actions/index';
import { rootState } from '../../store/state';

export function editorHeightReducer(
    state: string = rootState.editor.height,
    action: actionWithPayload
) {
    switch (action.type) {
        case EDITOR_HEIGHT_CHANGE:
            return action.payload;
        default:
            return state;
    }
}