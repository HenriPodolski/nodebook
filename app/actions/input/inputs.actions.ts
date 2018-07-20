import { environment } from '../../environments/environment';

export const INPUTS_NEW = 'INPUTS_NEW';

export const INPUTS_MODE_CHANGE = 'INPUTS_MODE_CHANGE';
export const INPUTS_STATE = 'INPUTS_STATE';
export const INPUTS_VALUE_CHANGE = 'INPUTS_VALUE_CHANGE';
export const INPUTS_HEIGHT_CHANGE = 'INPUTS_HEIGHT_CHANGE';
export const INPUTS_THEME_CHANGE = 'INPUTS_THEME_CHANGE';
export const INPUTS_READONLY_CHANGE = 'INPUTS_READONLY_CHANGE';
export const INPUTS_EXECUTE_FLAG_CHANGE = 'INPUTS_EXECUTE_FLAG_CHANGE';

export function newAction(payload = {...environment.config.input.editableConfig}) {
    return {
        type: INPUTS_NEW,
        payload
    };
}

export function stateAction() {
    return {
        type: INPUTS_STATE
    };
}

export function modeChangeAction(payload: string, id: number) {
    console.log('modeChangeAction', payload, id);

    return {
        type: INPUTS_MODE_CHANGE,
        payload,
        id
    };
}

export function valueChangeAction(payload: string, id: number) {
    return {
        type: INPUTS_VALUE_CHANGE,
        payload,
        id
    };
}

export function heightChangeAction(payload: string, id: number) {
    return {
        type: INPUTS_HEIGHT_CHANGE,
        payload,
        id
    };
}

export function themeChangeAction(payload: string, id: number) {
    return {
        type: INPUTS_THEME_CHANGE,
        payload,
        id
    };
}

export function readonlyChangeAction(payload: string, id: number) {
    return {
        type: INPUTS_READONLY_CHANGE,
        payload,
        id
    };
}

export function executeFlagChangeAction(payload: string, id: number) {
    return {
        type: INPUTS_EXECUTE_FLAG_CHANGE,
        payload,
        id
    };
}