import * as React from 'react';
import { CodeInputContainer } from '../containers/editor/code-input.container';
import { ModeInputContainer } from '../containers/editor/mode-input.container';
import { OutputContainer } from '../containers/output/output.container';
import { EditorsContainer } from '../containers/editors.container';

export class AppComponent extends React.Component {

    render() {
        return (
            <div>
                <h1>Title</h1>
                <ol>
                    <li>Use iframe for output</li>
                    <li>TS Node for ts output</li>
                    <li>Implement nodebook dependency config</li>
                    <li>Difference between browser and node code</li>
                    <li>Implement editors list logic</li>
                    <li>Make title editable</li>
                    <li>Save nodebook as file</li>
                    <li>nodebook as file loading/execution logic</li>
                </ol>
                <EditorsContainer />
            </div>
        );
    }
}