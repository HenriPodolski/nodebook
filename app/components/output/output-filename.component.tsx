import * as React from 'react';

interface IComponentProps {
    mode: string;
    short: string;
    index: number;
}

export class OutputFilenameComponent extends React.Component<IComponentProps> {

    constructor(props: IComponentProps, context?: any) {
        super(props, context);
    }

    render() {
        return (
            <>
                <input type="text" />.{this.props.short}
            </>
        );
    }
}