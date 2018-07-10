import * as exportEditorActions from './editor/editor.actions';
import * as exportEditorsActions from './editor/editors.actions';


export type action = {
    type: string
};

export type actionWithPayload<T> = {
    type: string,
    id?: number,
    payload: T
};

export const editorActions = exportEditorActions;
export const editorsActions = exportEditorsActions;
