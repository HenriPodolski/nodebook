import * as React from 'react';
import { CodeInputContainer } from '../containers/code-input.container';
import { ModeInputContainer } from '../containers/mode-input.container';

export class AppComponent extends React.Component {

    render() {
        return (
            <div>
                <h1>Title</h1>
                <ModeInputContainer />
                <CodeInputContainer />
            </div>
        );
    }
}