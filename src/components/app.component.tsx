import * as React from 'react';
import { CodeInputComponent } from './code-input.component';
import { ModeInputComponent } from './mode-input.component';

export class AppComponent extends React.Component {

    render() {
        return (
            <div>
                <h1>Title</h1>
                <ModeInputComponent />
                <CodeInputComponent />
            </div>
        );
    }
}