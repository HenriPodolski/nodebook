import { environment } from '../environments/environment';

export interface IEditorState {
    mode: string;
    theme: string;
    height: string;
    width: string;
    value: string;
    readOnly?: boolean;
    editor: IEditorEditorState;
}

export interface IEditorEditorState {
    maxLines: number;
    autoScrollEditorIntoView: boolean;
    wrap: boolean;
    minLines: number;
}

export interface IRootState {
    editors: IEditorState[]
    debug: {
        components: boolean
    }
}


export const rootState: IRootState = {
    debug: {
        components: true
    },
    editors: [
        {...environment.config.editor.editableConfig}
    ]
};