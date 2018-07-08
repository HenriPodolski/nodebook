import { actionWithPayload } from '../../actions/index';
import { rootState } from '../../store/state';
import { EDITOR_EXECUTE_FLAG_CHANGE } from '../../actions/editor/editor.actions';

export function editorExecuteFlagReducer(
    state: string = rootState.editors[0].executeFlag,
    action: actionWithPayload<string>
) {
    switch (action.type) {
        case EDITOR_EXECUTE_FLAG_CHANGE:
            return action.payload;
        default:
            return state;
    }
}