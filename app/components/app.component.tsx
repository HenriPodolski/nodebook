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
                    <li style={{textDecoration: 'line-through'}}>Get stdout from executed js code and write it to output store</li>
                    <li style={{textDecoration: 'line-through'}}>Write code input values to files before execution</li>
                    <li style={{textDecoration: 'line-through'}}>Get stdout from executed ts code and write it to output store</li>
                    <li style={{textDecoration: 'line-through'}}>Output logs with log component</li>
                    <li style={{textDecoration: 'line-through'}}>Fix edit state after first execution</li>
                    <li style={{textDecoration: 'line-through'}}>Integrate toggle between browser and node code</li>
                    <li>Implement js execution context for client aka browser</li>
                    <li>Handle filename changes by renaming existing files</li>
                    <li>Implement multiselect for snippets to use for current context</li>
                    <li>
                        Integrate display/execution order into package.json within key nodebook
                        <pre>
                            {JSON.stringify({"nodebook": [
                                    {
                                        "id": 1,
                                        "name": "filename.js",
                                        "context": "client",
                                        "dependencies": []
                                    }, {
                                        "id": 2,
                                        "name": "filename.ext",
                                        "dependencies": [1]
                                    }
                               ]}, null, 2)}
                        </pre>
                    </li>
                    <li>Process js code values for output store</li>
                    <li>Process ts code values for output store</li>
                    <li>Process html code values for output store</li>
                    <li>Process md code values for output store</li>
                    <li>Process css code values for output store</li>
                    <li>Process scss code values for output store</li>
                    <li>Parse json data values for output store</li>
                    <li>Get stdout from executed scss code and write it to output store</li>
                    <li>Get parse error from json and write it to output store</li>
                    <li>Implement nodebook package.json dependency config</li>
                    <li>Make title editable</li>
                    <li>nodebook as file loading/execution logic</li>
                    <li>Implement full featured loggin component</li>
                    <li>Delete editor item functionality, if readOnly</li>
                    <li>Create ux design and change views accordingly</li>
                    <li>Create visual design and apply it</li>
                    <li>Add dark and bright mode switch</li>
                </ol>
                <InputsContainer />
            </div>
        );
    }
}