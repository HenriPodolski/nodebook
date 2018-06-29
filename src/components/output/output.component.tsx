import * as React from 'react';

interface IComponentProps {
    mode: string;
    value: string;
}

export class OutputComponent extends React.Component<IComponentProps> {

    constructor(props: IComponentProps) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.mode}: {this.props.value}
            </div>
        );
    }
}