import { environment } from '../../environments/environment';
import { IErrorsInterface } from '../../shared/interfaces/errors.interface';

export const INPUTS_NEW = 'INPUTS_NEW';
export const INPUTS_VALIDATION_ERRORS_CHANGE = 'INPUTS_VALIDATION_ERRORS_CHANGE';
export const INPUTS_NAME_CHANGE = 'INPUTS_NAME_CHANGE';
export const INPUTS_MODE_CHANGE = 'INPUTS_MODE_CHANGE';
export const INPUTS_CONTEXT_CHANGE = 'INPUTS_CONTEXT_CHANGE';
export const INPUTS_STATE = 'INPUTS_STATE';
export const INPUTS_VALUE_CHANGE = 'INPUTS_VALUE_CHANGE';
export const INPUTS_HEIGHT_CHANGE = 'INPUTS_HEIGHT_CHANGE';
export const INPUTS_THEME_CHANGE = 'INPUTS_THEME_CHANGE';
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

export function nameChangeAction(payload: string, id: number) {
    return {
        type: INPUTS_NAME_CHANGE,
        payload,
        id
    };
}

export function validationErrorsChangeAction(payload: {[key: string]: IErrorsInterface[]}, id: number) {
    return {
        type: INPUTS_VALIDATION_ERRORS_CHANGE,
        payload,
        id
    };
}

export function modeChangeAction(payload: string, id: number) {
    return {
        type: INPUTS_MODE_CHANGE,
        payload,
        id
    };
}

export function contextChangeAction(payload: string, id: number) {
    return {
        type: INPUTS_CONTEXT_CHANGE,
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

export function executeFlagChangeAction(payload: string, id: number) {
    return {
        type: INPUTS_EXECUTE_FLAG_CHANGE,
        payload,
        id
    };
}