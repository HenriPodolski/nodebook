import { environment } from '../environments/environment';
import { IInput } from '../shared/interfaces/input.interface';

export interface IRootState {
    inputs: IInput[],
    outputs: any[],
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
        components: LogLevel.off,
        store: LogLevel.off
    },
    inputs: [
        {...environment.config.input.editableConfig}
    ],
    outputs: []
};