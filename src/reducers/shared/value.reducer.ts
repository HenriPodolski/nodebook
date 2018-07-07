import { EDITOR_VALUE_CHANGE } from '../../actions/editor/editor.actions';
import { actionWithPayload } from '../../actions/index';
import { rootState } from '../../store/state';

export function editorValueReducer(
    state: string = rootState.editors[0].value,
    action: actionWithPayload<string>
) {
    switch (action.type) {
        case EDITOR_VALUE_CHANGE:
            return action.payload;
        default:
            return state;
    }
}