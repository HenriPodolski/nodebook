export const EDITOR_MODE_CHANGE = 'EDITOR_MODE_CHANGE';
export const EDITOR_VALUE_CHANGE = 'EDITOR_VALUE_CHANGE';
export const EDITOR_HEIGHT_CHANGE = 'EDITOR_HEIGHT_CHANGE';
export const EDITOR_THEME_CHANGE = 'EDITOR_THEME_CHANGE';
export const EDITOR_READONLY_CHANGE = 'EDITOR_READONLY_CHANGE';
export const EDITOR_EXECUTE_FLAG_CHANGE = 'EDITOR_EXECUTE_FLAG_CHANGE';

export function modeChangeAction(payload: string) {
    return {
        type: EDITOR_MODE_CHANGE,
        payload
    };
}

export function valueChangeAction(payload: string) {
    return {
        type: EDITOR_VALUE_CHANGE,
        payload
    };
}

export function heightChangeAction(payload: string) {
    return {
        type: EDITOR_HEIGHT_CHANGE,
        payload
    };
}

export function themeChangeAction(payload: string) {
    return {
        type: EDITOR_THEME_CHANGE,
        payload
    };
}

export function readonlyChangeAction(payload: string) {
    return {
        type: EDITOR_READONLY_CHANGE,
        payload
    };
}

export function executeFlagChangeAction(payload: string) {
    return {
        type: EDITOR_EXECUTE_FLAG_CHANGE,
        payload
    };
}