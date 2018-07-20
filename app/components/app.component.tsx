import * as React from 'react';
import { InputsContainer } from '../containers/inputs.container';

let styles = require('./app.component.scss');

export class AppComponent extends React.Component {

    render() {
        return (
            <div className={styles.AppComponent}>
                <h1>Title</h1>
                <ol>
                    <li style={{textDecoration: 'line-through'}}>Use iframe for output</li>
                    <li style={{textDecoration: 'line-through'}}>TS Node for ts output</li>
                    <li style={{textDecoration: 'line-through'}}>Implement editors list logic</li>
                    <li>Divide output from editor value</li>
                    <li>Rename editor to input</li>
                    <li>Difference between browser and node code?</li>
                    <li>
                        Implement multiselect for snippets to use for current context
                        <pre>%include md.3 html.1 css.1 css.2 js.1 ts.2</pre>
                    </li>
                    <li>Implement nodebook package.json dependency config</li>
                    <li>Make title editable</li>
                    <li>Make file title editable</li>
                    <li>Save nodebook as file</li>
                    <li>nodebook as file loading/execution logic</li>
                    <li>Delete editor item functionality</li>
                </ol>
                <InputsContainer />
            </div>
        );
    }
}