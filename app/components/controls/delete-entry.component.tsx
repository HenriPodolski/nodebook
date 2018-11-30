import * as React from 'react';

interface IComponentProps {
    index: number;
    deleteEntry: (index: number) => {type: string, index: number};
}

export class DeleteEntryComponent extends React.Component<IComponentProps> {

    constructor(props: IComponentProps) {
        super(props);
        this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    }

    handleDeleteButtonClick(evt) {
        evt.preventDefault();
        console.log('DeleteEntryComponent.handleDeleteButtonClick()', this.props.index);
        this.props.deleteEntry(this.props.index);
    }

    render() {
        return (
            <button onClick={this.handleDeleteButtonClick}>Delete</button>
        );
    }
}