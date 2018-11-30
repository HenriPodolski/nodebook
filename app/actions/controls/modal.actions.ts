export const MODAL_DIALOG_SHOW = 'MODAL_DIALOG_SHOW';
export const MODAL_DIALOG_HIDE = 'MODAL_DIALOG_HIDE';

export function showModalDialogAction(payload: any) {
    return {
        type: MODAL_DIALOG_SHOW,
        payload
    };
}

export function hideModalDialogAction(payload: any) {
    return {
        type: MODAL_DIALOG_HIDE,
        payload
    };
}