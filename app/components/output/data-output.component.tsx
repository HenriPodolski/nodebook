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
                <p>To use as data source in scripting:</p>
                <pre>
                    import * as data from '{this.props.output.infos.relativeFilePath}';
                </pre>
            </div>
        );
    }
}