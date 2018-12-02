export const OUTPUTS_UPDATE = 'OUTPUTS_UPDATE';
export const OUTPUTS_DELETE = 'OUTPUTS_DELETE';
export const OUTPUTS_STATE = 'OUTPUTS_STATE';

export function updateAction(payload) {
    return {
        type: OUTPUTS_UPDATE,
        payload
    };
}

export function deleteAction(payload: {id: number}) {
    return {
        type: OUTPUTS_DELETE,
        id: payload.id
    };
}

export function stateAction() {
    return {
        type: OUTPUTS_STATE
    };
}