import { IEditorState, rootState } from '../../store/state';
import { actionWithPayload } from '../../actions';
import { editorReducer } from './editor.reducer';

export function editorsReducer(
    state: IEditorState[] = rootState.editors,
    action: actionWithPayload
) {
    switch (action.type) {
        default:
            return state.map(current =>
                editorReducer(current, action)
            )
    }
}