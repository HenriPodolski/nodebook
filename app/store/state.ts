import { environment } from '../environments/environment';

export interface IInputState {
    id: number;
    mode: string;
    theme: string;
    height: string;
    width: string;
    value: string;
    executeFlag: string;
    readOnly?: boolean;
    editor: IInputEditorState;
}

export interface IInputEditorState {
    maxLines: number;
    autoScrollEditorIntoView: boolean;
    wrap: boolean;
    minLines: number;
}

export interface IRootState {
    inputs: IInputState[]
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
    inputs: [
        {...environment.config.input.editableConfig}
    ]
};