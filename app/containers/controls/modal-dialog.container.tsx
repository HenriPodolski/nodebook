import { connect } from 'react-redux';
import { ModalDialogComponent } from '../../components/controls/modal-dialog.component';
import { hideModalDialogAction } from '../../actions/controls/modal.actions';
import { deleteAction } from '../../actions/controls/delete.actions';

const mapStateToProps = (state) => ({
    modalDialog: state.controls.modalDialog
});

const mapDispatchToProps = (dispatch) => {
    return ({
        hideModalDialog: () => {
            return dispatch(hideModalDialogAction());
        },
        deleteEntry: (id: number, rm: boolean) => {
            return dispatch(deleteAction(id, rm));
        }
    });
};

export const ModalDialogContainer = connect(mapStateToProps, mapDispatchToProps)(ModalDialogComponent);