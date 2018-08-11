export const OUTPUTS_UPDATE = 'OUTPUTS_UPDATE';
export const OUTPUTS_STATE = 'OUTPUTS_STATE';

export function updateAction(payload) {
    return {
        type: OUTPUTS_UPDATE,
        payload
    };
}

export function stateAction() {
    return {
        type: OUTPUTS_STATE
    };
}