import { environment } from '../environments/environment';

export interface IEditorState {
    mode: string;
    theme: string;
    height: string;
    width: string;
    value: string;
    executeFlag: string;
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
        components: string,
        store: string
    }
}

enum LogLevel {
    debug = 'debug',
    info = 'info',
    log = 'log',
    warn = 'warn',
    error = 'error',
    off = ''
}


export const rootState: IRootState = {
    debug: {
        components: LogLevel.debug,
        store: LogLevel.debug
    },
    editors: [
        {...environment.config.editor.editableConfig}
    ]
};