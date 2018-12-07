import { actionWithPayload } from '../../actions';
import {
    CONTROLS_MODAL_DIALOG_HIDE,
    CONTROLS_MODAL_DIALOG_SHOW
} from '../../actions/controls/modal.actions';
import { IModalDialog } from '../../shared/interfaces/modal-dialog.interface';
import { rootState } from '../../store/state';

export function modalDialogReducer(
    state: IModalDialog | null = rootState.controls.modalDialog,
    action: actionWithPayload<IModalDialog>
): IModalDialog | null {
    switch (action.type) {
        case CONTROLS_MODAL_DIALOG_SHOW: {
            return action.payload;
        }

        case CONTROLS_MODAL_DIALOG_HIDE: {
            return null;
        }

        default:
            return state;
    }
}