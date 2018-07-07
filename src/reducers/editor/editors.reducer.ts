import { IEditorState, rootState } from '../../store/state';
import { actionWithPayload } from '../../actions';
import { editorReducer } from './editor.reducer';

export function editorsReducer(
    state: IEditorState[] = rootState.editors,
    action: actionWithPayload<any>
) {
    switch (action.type) {
        default:
            // apply action to all editors
            return state.map(current =>
                editorReducer(current, action)
            )
    }
}