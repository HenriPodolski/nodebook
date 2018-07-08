import * as React from 'react';

interface IComponentProps {
    value: string;
    changeExecuteFlag: (payload: string) => {type: string, payload: string};
}

export class TypescriptOutputComponent extends React.Component<IComponentProps> {

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