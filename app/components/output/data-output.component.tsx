import * as React from 'react';

interface IComponentProps {
    output: any;
}

export class DataOutputComponent extends React.Component<IComponentProps> {

    constructor(props: IComponentProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>Exposed data source for scripting:</p>
                <pre>
                    const {this.props.output.name} = nodebook.data.{this.props.output.name};
                </pre>
            </div>
        );
    }
}