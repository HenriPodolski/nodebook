import * as React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

interface IComponentProps {
    modal: any;
}

export class ModalDialogComponent extends React.Component<IComponentProps> {

    constructor(props: IComponentProps) {
        super(props);
    }

    handleClose() {
        console.log('ModalDialogComponent.handleClose()');
    }

    render() {
        return (
            <Modal
                isOpen={this.props.modal.open}
                onRequestClose={this.handleClose}
                style={customStyles}
                contentLabel={this.props.modal.label}
            >
                Modal
            </Modal>
        );
    }
}