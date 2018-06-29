import { editorValueReducer } from './value.reducer';
import { editorHeightReducer } from './height.reducer';
import { editorModeReducer } from './mode.reducer';
import { editorThemeReducer } from './theme.reducer';
import { IEditorState, rootState } from '../../store/state';
import { actionWithPayload } from '../../actions';

export function editorReducer(
    state: IEditorState = rootState.editor,
    action: actionWithPayload
) {
    switch (action.type) {
        default:
            return {
                ...state,
                mode: editorModeReducer(state.mode, action),
                height: editorHeightReducer(state.height, action),
                theme: editorThemeReducer(state.theme, action),
                value: editorValueReducer(state.value, action)
            };
    }
}