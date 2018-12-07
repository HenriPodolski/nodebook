import * as React from 'react';
import { InputsContainer } from '../containers/inputs.container';
import { LoadingEnums } from '../enums/loading.enums';
import { ModalDialogContainer } from '../containers/controls/modal-dialog.container';

let styles = require('./app.component.scss');

interface IComponentProps {
    debug: string;
    loading: any;
    init: () => { type: string };
}

export class AppComponent extends React.Component<IComponentProps> {

    componentWillMount() {
        this.props.init();
    }

    todos() {
        return (
            <>
                {this.props.debug && (
                    <div className={styles.AppComponent__Todos}>
                        <h3>MVP</h3>
                        <ol>
                            <li style={{textDecoration: 'line-through'}}>Use iframe for output</li>
                            <li style={{textDecoration: 'line-through'}}>TS Node for ts output</li>
                            <li style={{textDecoration: 'line-through'}}>Implement editors list
                                logic
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Divide output from editor
                                value
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Rename editor to input</li>
                            <li style={{textDecoration: 'line-through'}}>Fix output list additions
                                for every executed input
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Use input field value of
                                OutputFilenameComponent for filenames and give default values
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Make file title editable
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Filename input should be
                                displayed if code is editable and not if display only
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Code process methods should
                                be triggered on executeFlagChange and not by mapStateToProps of
                                different containers
                            </li>
                            <li style={{textDecoration: 'line-through'}}>MapStateToProps of code
                                outputs should use value of output
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Validate filename on
                                executeFlagChange for valid filename pattern
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Validate filename on
                                executeFlagChange no duplicate filename
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Get stdout from executed js
                                code and write it to output store
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Write code input values to
                                files before execution
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Get stdout from executed ts
                                code and write it to output store
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Output logs with log
                                component
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Fix edit state after first
                                execution
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Integrate toggle between
                                browser and node code
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Implement js execution
                                context for client aka browser
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Handle filename changes by
                                renaming existing files
                            </li>
                            <li></li>
                            <li style={{textDecoration: 'line-through'}}>
                                Integrate display/execution order into package.json using nodebook
                                attribute
                                <pre>
                                {JSON.stringify({
                                    "nodebook": {
                                        "nodes": [
                                            {
                                                "id": 1,
                                                "name": "filename.js",
                                                "context": "client"
                                            }, {
                                                "id": 2,
                                                "name": "filename.ext"
                                            }
                                        ]
                                    }
                                }, null, 2)}
                            </pre>
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Use nodebook config as file
                                loading and code execution logic
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Bugfix for package nodebook
                                persistence overrides previous node
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Bugfix for loaded inputs do
                                not get renamed after name change
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Manual code file deletions
                                update package.json nodes on startup
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Execute items on first
                                load
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Handle errors caused by
                                package.json nodebook config
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Show application loading
                                screen until first load done
                            </li>
                            <li></li>
                            <li style={{textDecoration: 'line-through'}}>Provide loading screen and
                                actions to start and stop loading
                            </li>
                            <li></li>
                            <li style={{textDecoration: 'line-through'}}>Fix js server side code
                                execution
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Fix endless loop which
                                occurs after adding > 1 js client files
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Refactor js client output
                                component as it should execute all client side code
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Process js code values for
                                output store
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Process html code values
                                for output store
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Fix output of multiple default .md inputs</li>
                            <li style={{textDecoration: 'line-through'}}>Process ts code values for output store</li>
                            <li style={{textDecoration: 'line-through'}}>Add typescript interpreter to the client in client output component
                            </li>
                            <li style={{textDecoration: 'line-through'}}>Process md code for output</li>
                            <li style={{textDecoration: 'line-through'}}>Process css code for output</li>
                            <li style={{textDecoration: 'line-through'}}>Save css, md, html to nodebook and make it load on initialize</li>
                            <li style={{textDecoration: 'line-through'}}>Delete input/output functionality and UI</li>
                            <li style={{textDecoration: 'line-through'}}>Add confirm delete modal</li>
                            <li style={{textDecoration: 'line-through'}}>Parse json data values for output and make it available for scripting</li>
                            <li>Apply code execution chain to processors and reload output that might have changed, on delete or value update or mode change</li>
                            <li>Remove Editor for Markdown as it is documentation</li>
                            <li>Make selectors available for HTML, to make it possible to specify exact html
                                placement in client output component
                            </li>
                            <li>Get parse error from json and write it to output store</li>
                            <li>Clean up nodebook folder if code source folder becomes empty on removeFile</li>
                            <li>
                                Add title to package.json nodebook
                                <pre>
                                {JSON.stringify({
                                    "nodebook": {
                                        "title": "Some title",
                                        "nodes": []
                                    }
                                }, null, 2)}
                            </pre>
                            </li>
                            <li>Make title editable</li>
                            <li></li>
                            <li>Validate html for not using html, body, head</li>
                            <li>Build html selector UI for selecting where to place HTML snippet</li>
                            <li>Add selector for html placement in html input</li>
                            <li></li>
                            <li>Add asset file uploads</li>
                            <li>Make it possible to load data from other/remote data sources</li>
                            <li></li>
                            <li>Add scss to supported modes</li>
                            <li>Process scss code values for output</li>
                            <li></li>
                            <li>Integrate console hooks for all modes and contexts (consider using _console and replacement in code)</li>
                            <li>Implement console hooks as observer, which update the console output
                                view whenever included code logs
                            </li>
                            <li>Design and implement full featured logging component</li>
                            <li>Delete editor item functionality, if readOnly</li>
                            <li>Create ux design and change views accordingly</li>
                            <li>Create visual design and apply it</li>
                            <li>Style output section, add tabs and add max-height and scrollbars for long output</li>
                            <li></li>
                            <li>Provide release artefact workflow in github (travis)</li>
                            <li>Add documentation</li>
                            <li>Provide landing page</li>
                        </ol>
                        <h3>Backlog</h3>
                        <ol>
                            <li>Confirm file override in case file is present but not in package.json</li>
                            <li>Get stdout from executed scss code and write it to output store</li>
                            <li></li>
                            <li>Implement nodebook package.json dependency config</li>
                            <li>Display list of installed packages in the gui</li>
                            <li>Perform install on package add</li>
                            <li>Integrate npm package autocomplete</li>
                            <li></li>
                            <li>Add dark and bright mode switch</li>
                            <li>Create deployable bundles of server and client side nodebooks</li>
                            <li>Integrate NODE red</li>
                            <li>Autocomplete Code
                                <ol>
                                    <li>JavaScript</li>
                                    <li>TypeScript</li>
                                    <li>SCSS</li>
                                    <li>CSS</li>
                                    <li>HTML</li>
                                </ol>
                            </li>
                            <li>Implement multiselect for snippets to use for current context
                                (necessary?, valuable?)
                            </li>
                            <li>Add dependencies fields in nodebook package json (necessary?,
                                valuable?)
                            </li>
                            <li>Make file operations asynchronous (necessary?, valuable?)</li>
                        </ol>
                    </div>
                )}
            </>
        );
    }

    application() {
        return (
            <div className={styles.AppComponent}>
                <h1>Nodebook</h1>
                <InputsContainer/>
                {this.todos()}
            </div>
        );
    }

    loading() {
        return (
            <div className={styles.AppComponent__Loading}>
                <div>Simulated Loading...</div>
            </div>
        );
    }


    render() {
        return (
            <>
                <ModalDialogContainer></ModalDialogContainer>
                {
                    !this.props.loading[LoadingEnums.components.application] ?
                        this.application() : this.loading()
                }
            </>
        );
    }
}
