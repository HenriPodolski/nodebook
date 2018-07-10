import { IEditorState, rootState } from '../../store/state';
import { actionWithPayload } from '../../actions';
import { editorReducer } from './editor.reducer';
import {
    EDITORS_NEW
} from '../../actions/editor/editors.actions';

export function editorsReducer(
    state: IEditorState[] = rootState.editors,
    action: actionWithPayload<any>
): IEditorState[] {
    switch (action.type) {
        case EDITORS_NEW: {
            const newItem = action.payload;
            const currentState = [...state, newItem];
            return currentState.map((current, index) =>
                editorReducer(current, action, index)
            )
        }
        default:
            // apply action to all editors
            return state.reduce((previous, next, index) => {
                if (index === action.id) {
                    previous = [...previous, editorReducer(next, action, index)];
                } else {
                    previous = [...previous, next];
                }

                return previous;
            }, [] as IEditorState[]);
    }
}