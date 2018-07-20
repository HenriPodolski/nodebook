export const INPUT_MODE_CHANGE = 'INPUT_MODE_CHANGE';
export const INPUT_VALUE_CHANGE = 'INPUT_VALUE_CHANGE';
export const INPUT_HEIGHT_CHANGE = 'INPUT_HEIGHT_CHANGE';
export const INPUT_THEME_CHANGE = 'INPUT_THEME_CHANGE';
export const INPUT_READONLY_CHANGE = 'INPUT_READONLY_CHANGE';
export const INPUT_EXECUTE_FLAG_CHANGE = 'INPUT_EXECUTE_FLAG_CHANGE';

export function modeChangeAction(payload: string) {
    return {
        type: INPUT_MODE_CHANGE,
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

export function readonlyChangeAction(payload: string) {
    return {
        type: INPUT_READONLY_CHANGE,
        payload
    };
}

export function executeFlagChangeAction(payload: string) {
    return {
        type: INPUT_EXECUTE_FLAG_CHANGE,
        payload
    };
}