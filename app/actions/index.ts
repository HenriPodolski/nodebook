import * as exportEditorActions from './editor/editor.actions';

export type action = {
    type: string
};

export type actionWithPayload<T> = {
    type: string,
    payload: T
};

export const editorActions = exportEditorActions;
