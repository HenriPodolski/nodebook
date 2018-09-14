import * as React from 'react';
import { InputsContainer } from '../containers/inputs.container';

let styles = require('./app.component.scss');

export class AppComponent extends React.Component {

    render() {
        return (
            <div className={styles.AppComponent}>
                <h1>Nodebook</h1>
                <ol>
                    <li style={{textDecoration: 'line-through'}}>Use iframe for output</li>
                    <li style={{textDecoration: 'line-through'}}>TS Node for ts output</li>
                    <li style={{textDecoration: 'line-through'}}>Implement editors list logic</li>
                    <li style={{textDecoration: 'line-through'}}>Divide output from editor value</li>
                    <li style={{textDecoration: 'line-through'}}>Rename editor to input</li>
                    <li style={{textDecoration: 'line-through'}}>Fix output list additions for every executed input</li>
                    <li style={{textDecoration: 'line-through'}}>Use input field value of OutputFilenameComponent for filenames and give default values</li>
                    <li style={{textDecoration: 'line-through'}}>Make file title editable</li>
                    <li style={{textDecoration: 'line-through'}}>Filename input should be displayed if code is editable and not if display only</li>
                    <li style={{textDecoration: 'line-through'}}>Code process methods should be triggered on executeFlagChange and not by mapStateToProps of different containers</li>
                    <li style={{textDecoration: 'line-through'}}>MapStateToProps of code outputs should use value of output</li>
                    <li style={{textDecoration: 'line-through'}}>Validate filename on executeFlagChange for valid filename pattern</li>
                    <li style={{textDecoration: 'line-through'}}>Validate filename on executeFlagChange no duplicate filename</li>
                    <li>Get stdout from executed code and write it to output store</li>
                    <li>Handle filename changes by renaming existing files</li>
                    <li>
                        Integrate display/execution order into package.json within key nodebook
                        <pre>
                            {JSON.stringify({"nodebook": [
                                    {
                                        "id": 1,
                                        "name": "filename.ext"
                                    }
                               ]}, null, 2)}
                        </pre>
                    </li>
                    <li>Write code input values to files before execution</li>
                    <li>Process all kinds of code values for output store</li>
                    <li>Difference between browser and node code?</li>
                    <li>
                        Implement multiselect for snippets to use for current context
                        <pre>%include 1.html 1.css 2.css 1.js 2.ts</pre>
                    </li>
                    <li>Implement nodebook package.json dependency config</li>
                    <li>Make title editable</li>
                    <li>nodebook as file loading/execution logic</li>
                    <li>Delete editor item functionality</li>
                </ol>
                <InputsContainer />
            </div>
        );
    }
}