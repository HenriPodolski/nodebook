import { editorValueReducer } from '../shared/value.reducer';
import { editorHeightReducer } from '../shared/height.reducer';
import { editorModeReducer } from '../shared/mode.reducer';
import { editorThemeReducer } from '../shared/theme.reducer';
import { IEditorState, rootState } from '../../store/state';
import { actionWithPayload } from '../../actions';
import { editorReadonlyReducer } from '../shared/readonly.reducer';
import { editorExecuteFlagReducer } from '../shared/execute-flag.reducer';

export function editorReducer(
    state: IEditorState = { ...rootState.editors[0] },
    action: actionWithPayload<string | boolean>
) {
    switch (action.type) {
        default:
            return {
                ...state,
                mode: editorModeReducer(state.mode, action as actionWithPayload<string>),
                height: editorHeightReducer(state.height, action as actionWithPayload<string>),
                theme: editorThemeReducer(state.theme, action as actionWithPayload<string>),
                value: editorValueReducer(state.value, action as actionWithPayload<string>),
                readOnly: editorReadonlyReducer(state.readOnly, action as actionWithPayload<boolean>),
                executeFlag: editorExecuteFlagReducer(state.executeFlag, action as actionWithPayload<string>)
            };
    }
}