import * as React from 'react';
import { CodeInputContainer } from '../containers/editor/code-input.container';
import { ModeInputContainer } from '../containers/editor/mode-input.container';
import { OutputContainer } from '../containers/output/output.container';
import { DebugContainer } from '../containers/debug.container';

interface IComponentProps {
    editors: any[];
    debug: boolean;
}

export class EditorsComponent extends React.Component<IComponentProps> {

    constructor(props: IComponentProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <DebugContainer editors={this.props.editors} />

                {this.props.editors.map((dataset, i) => {
                    return (
                        <React.Fragment key={i}>
                            {!dataset.readOnly && <ModeInputContainer index={i} />}
                            <CodeInputContainer index={i}/>
                            <OutputContainer index={i} />
                        </React.Fragment>
                    )
                })}
            </div>
        );
    }
}