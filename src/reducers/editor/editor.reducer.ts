import { editorValueReducer } from '../shared/value.reducer';
import { editorHeightReducer } from '../shared/height.reducer';
import { editorModeReducer } from '../shared/mode.reducer';
import { editorThemeReducer } from '../shared/theme.reducer';
import { IEditorState, rootState } from '../../store/state';
import { actionWithPayload } from '../../actions';

export function editorReducer(
    state: IEditorState = { ...rootState.editors[0] },
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