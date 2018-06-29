export interface IEditorState {
    mode: string;
    theme: string;
    height: string;
    width: string;
    value: string;
    editor: IEditorEditorState;
}

export interface IEditorEditorState {
    maxLines: number;
    autoScrollEditorIntoView: boolean;
    wrap: boolean;
    minLines: number;
}

export interface IRootState {
    editor: IEditorState
}


export const rootState: IRootState = {
    editor: {
        mode: 'markdown',
        theme: 'github',
        height: '100%',
        width: '100%',
        value: '',
        editor: {
            maxLines: Infinity,
            autoScrollEditorIntoView: true,
            wrap: true,
            minLines: 1
        }
    }

};