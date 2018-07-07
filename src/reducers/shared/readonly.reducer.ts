import { EDITOR_READONLY_CHANGE } from '../../actions/editor/editor.actions';
import { actionWithPayload } from '../../actions/index';
import { rootState } from '../../store/state';

export function editorReadonlyReducer(
    state: boolean = rootState.editors[0].readOnly,
    action: actionWithPayload<boolean>
) {
    switch (action.type) {
        case EDITOR_READONLY_CHANGE:
            return action.payload;
        default:
            return state;
    }
}