import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';

interface IComponentProps {
    value: string;
}

export class MarkdownOutputComponent extends React.Component<IComponentProps> {

    constructor(props: IComponentProps) {
        super(props);
    }

    render() {
        return (
            <ReactMarkdown source={this.props.value} />
        );
    }
}