import { IModalDialog } from '../../shared/interfaces/modal-dialog.interface';

export const CONTROLS_MODAL_DIALOG_SHOW = 'CONTROLS_MODAL_DIALOG_SHOW';
export const CONTROLS_MODAL_DIALOG_HIDE = 'MODAL_DIALOG_HIDE';

export function showModalDialogAction(payload: IModalDialog) {
    return {
        type: CONTROLS_MODAL_DIALOG_SHOW,
        payload
    };
}

export function hideModalDialogAction() {
    return {
        type: CONTROLS_MODAL_DIALOG_HIDE
    };
}