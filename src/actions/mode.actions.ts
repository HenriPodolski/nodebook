export const MODE_CHANGE = 'MODE_CHANGE';

export function changeAction(payload: string) {
    return {
        type: MODE_CHANGE,
        payload
    };
}