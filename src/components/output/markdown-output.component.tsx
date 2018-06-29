import * as React from 'react';

interface IComponentProps {
    value: string;
}

export class MarkdownOutputComponent extends React.Component<IComponentProps> {

    constructor(props: IComponentProps) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.value}
            </div>
        );
    }
}