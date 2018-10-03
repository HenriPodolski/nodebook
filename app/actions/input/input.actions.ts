import { IErrorsInterface } from '../../shared/interfaces/errors.interface';

export const INPUT_NAME_CHANGE = 'INPUT_NAME_CHANGE';
export const INPUT_VALIDATION_ERRORS_CHANGE = 'INPUT_VALIDATION_ERRORS_CHANGE';
export const INPUT_MODE_CHANGE = 'INPUT_MODE_CHANGE';
export const INPUT_CONTEXT_CHANGE = 'INPUT_CONTEXT_CHANGE';
export const INPUT_VALUE_CHANGE = 'INPUT_VALUE_CHANGE';
export const INPUT_HEIGHT_CHANGE = 'INPUT_HEIGHT_CHANGE';
export const INPUT_THEME_CHANGE = 'INPUT_THEME_CHANGE';
export const INPUT_EXECUTE_FLAG_CHANGE = 'INPUT_EXECUTE_FLAG_CHANGE';

export function nameChangeAction(payload: string) {
    return {
        type: INPUT_NAME_CHANGE,
        payload
    };
}

export function validationErrorsChangeAction(payload: {[key: string]: IErrorsInterface[]}) {
    return {
        type: INPUT_VALIDATION_ERRORS_CHANGE,
        payload
    };
}

export function modeChangeAction(payload: string) {
    return {
        type: INPUT_MODE_CHANGE,
        payload
    };
}

export function contextChangeAction(payload: string) {
    return {
        type: INPUT_CONTEXT_CHANGE,
        payload
    };
}

export function valueChangeAction(payload: string) {
    return {
        type: INPUT_VALUE_CHANGE,
        payload
    };
}

export function heightChangeAction(payload: string) {
    return {
        type: INPUT_HEIGHT_CHANGE,
        payload
    };
}

export function themeChangeAction(payload: string) {
    return {
        type: INPUT_THEME_CHANGE,
        payload
    };
}

export function executeFlagChangeAction(payload: string) {
    return {
        type: INPUT_EXECUTE_FLAG_CHANGE,
        payload
    };
}