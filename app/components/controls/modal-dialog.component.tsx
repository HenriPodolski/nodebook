import * as React from 'react';
import { RefObject } from 'react';
import { IModalDialog } from '../../shared/interfaces/modal-dialog.interface';

let styles = require('./modal-dialog.component.scss');

interface IComponentProps {
    modalDialog: IModalDialog;
    hideModalDialog: () => {type: string};
    deleteEntry: (id: number, rm: boolean) => {type: string, id: number, rm: boolean};
}

export class ModalDialogComponent extends React.Component<IComponentProps> {

    modalDialogRef: RefObject<HTMLDialogElement>;

    constructor(props: IComponentProps) {
        super(props);

        this.modalDialogRef = React.createRef();

        this.handleDeleteEntryCancelClick = this.handleDeleteEntryCancelClick.bind(this);
        this.handleDeleteEntryConfirmClick = this.handleDeleteEntryConfirmClick.bind(this);
        this.handleDeleteEntryConfirmAllClick = this.handleDeleteEntryConfirmAllClick.bind(this);
    }

    handleDeleteEntryCancelClick() {
        this.props.hideModalDialog();
    }

    handleDeleteEntryConfirmClick() {
        this.props.hideModalDialog();

        if (!isNaN(this.props.modalDialog.id as number)) {
            this.props.deleteEntry(this.props.modalDialog.id as number, false);
        }
    }

    handleDeleteEntryConfirmAllClick() {
        this.props.hideModalDialog();

        if (!isNaN(this.props.modalDialog.id as number)) {
            this.props.deleteEntry(this.props.modalDialog.id as number, true);
        }
    }

    deleteEntryConfirm() {
        return (
          <>
              <menu>
                  <li>
                      <button onClick={this.handleDeleteEntryCancelClick}>Cancel</button>
                  </li>
                  <li>
                      <button onClick={this.handleDeleteEntryConfirmAllClick}>Delete Entry and File</button>
                  </li>
                  <li>
                      <button onClick={this.handleDeleteEntryConfirmClick}>Delete Entry</button>
                  </li>
              </menu>
          </>
        );
    }

    render() {
        return (
            <dialog className={styles.ModalDialog}
                    ref={this.modalDialogRef}
                    open={!!(this.props.modalDialog &&
                          this.props.modalDialog.type)}>
                {this.props.modalDialog &&
                 this.props.modalDialog.type &&
                 this[this.props.modalDialog.type] &&
                 this[this.props.modalDialog.type]()}
            </dialog>
        );
    }
}