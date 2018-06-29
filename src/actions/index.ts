import * as exportEditorActions from './editor/editor.actions';

export type action = {
    type: string
};

export type actionWithPayload = {
    type: string,
    payload: any
};

export const editorActions = exportEditorActions;
