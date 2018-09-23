import * as React from 'react';

interface IComponentProps {
    value: string;
    index: number;
    changeExecuteFlag: (payload: string) => {type: string, payload: string};
}

export class JavascriptOutputComponent extends React.Component<IComponentProps> {

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