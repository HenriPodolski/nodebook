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
                <EditorsContainer />
            </div>
        );
    }
}