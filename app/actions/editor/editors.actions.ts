import { environment } from '../../environments/environment';

export const EDITORS_NEW = 'EDITORS_NEW';

export const EDITORS_MODE_CHANGE = 'EDITOR_MODE_CHANGE';
export const EDITORS_STATE = 'EDITORS_STATE';
export const EDITORS_VALUE_CHANGE = 'EDITOR_VALUE_CHANGE';
export const EDITORS_HEIGHT_CHANGE = 'EDITOR_HEIGHT_CHANGE';
export const EDITORS_THEME_CHANGE = 'EDITOR_THEME_CHANGE';
export const EDITORS_READONLY_CHANGE = 'EDITOR_READONLY_CHANGE';
export const EDITORS_EXECUTE_FLAG_CHANGE = 'EDITOR_EXECUTE_FLAG_CHANGE';

export function newAction(payload = {...environment.config.editor.editableConfig}) {
    return {
        type: EDITORS_NEW,
        payload
    };
}

export function stateAction() {
    return {
        type: EDITORS_STATE
    };
}

export function modeChangeAction(payload: string, id: number) {
    return {
        type: EDITORS_MODE_CHANGE,
        payload,
        id
    };
}

export function valueChangeAction(payload: string, id: number) {
    return {
        type: EDITORS_VALUE_CHANGE,
        payload,
        id
    };
}

export function heightChangeAction(payload: string, id: number) {
    return {
        type: EDITORS_HEIGHT_CHANGE,
        payload,
        id
    };
}

export function themeChangeAction(payload: string, id: number) {
    return {
        type: EDITORS_THEME_CHANGE,
        payload,
        id
    };
}

export function readonlyChangeAction(payload: string, id: number) {
    return {
        type: EDITORS_READONLY_CHANGE,
        payload,
        id
    };
}

export function executeFlagChangeAction(payload: string, id: number) {
    return {
        type: EDITORS_EXECUTE_FLAG_CHANGE,
        payload,
        id
    };
}