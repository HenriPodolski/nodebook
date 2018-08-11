import * as React from 'react';
import { CodeInputContainer } from '../containers/input/code-input.container';
import { ModeInputContainer } from '../containers/input/mode-input.container';
import { OutputContainer } from '../containers/output/output.container';
import { DebugContainer } from '../containers/debug.container';

interface IComponentProps {
    inputs: any[];
    outputs: any[];
    debug: boolean;
}

export class InputsComponent extends React.Component<IComponentProps> {

    constructor(props: IComponentProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <DebugContainer inputs={this.props.inputs} />

                {this.props.inputs.map((dataset, i) => {
                    return (
                        <React.Fragment key={i}>
                            {!dataset.readOnly && <ModeInputContainer index={i} />}
                            <CodeInputContainer index={i}/>
                            {this.props.outputs[i] ? (
                                <OutputContainer index={i} />
                            ) : (
                                <></>
                            )}
                        </React.Fragment>
                    )
                })}
            </div>
        );
    }
}