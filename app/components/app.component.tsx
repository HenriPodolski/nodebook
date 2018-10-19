import * as React from 'react';
import { InputsContainer } from '../containers/inputs.container';
import { LoadingEnums } from '../enums/loading.enums';

let styles = require('./app.component.scss');

interface IComponentProps {
    debug: string;
	loading: any;
	stopLoading: (payload: string) => {type: string, payload: string};
}

export class AppComponent extends React.Component<IComponentProps> {

	componentWillMount() {
		setTimeout(() => this.props.stopLoading(LoadingEnums.components.application), 4000);
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
					<li style={{textDecoration: 'line-through'}}>Implement js execution context for client aka browser</li>
					<li style={{textDecoration: 'line-through'}}>Handle filename changes by renaming existing files</li>
					<li></li>
					<li style={{textDecoration: 'line-through'}}>
						Integrate display/execution order into package.json using nodebook attribute
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
					<li>Use nodebook config as file loading and code execution logic</li>
					<li>Show application loading screen until first load done</li>
					<li>Apply code execution chain to processors</li>
					<li>Add logic to deal with different code states</li>
					<li></li>
					<li style={{textDecoration: 'line-through'}}>Provide loading screen and actions to start and stop loading</li>
					<li></li>
					<li>Process js code values for output store</li>
					<li>Process ts code values for output store</li>
					<li>Process html code values for output store</li>
					<li>Process md code values for output store</li>
					<li>Process css code values for output store</li>
					<li>Process scss code values for output store</li>
					<li>Parse json data values for output store</li>
					<li>Get stdout from executed scss code and write it to output store</li>
					<li>Get parse error from json and write it to output store</li>
					<li></li>
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
					<li>Integrate console hooks for all modes and contexts</li>
					<li>Implement console hooks as observer, which update the console output view</li>
					<li>Design and implement full featured logging component</li>
					<li>Delete editor item functionality, if readOnly</li>
					<li>Create ux design and change views accordingly</li>
					<li>Create visual design and apply it</li>
					<li></li>
					<li>Implement nodebook package.json dependency config</li>
					<li>Display list of installed packages in the gui</li>
					<li>Perform install on package add</li>
					<li>Integrate npm package autocomplete</li>
					<li></li>
					<li>Provide release artefact workflow in github</li>
					<li>Add documentation</li>
					<li>Provide landing page</li>
				</ol>
				<h3>Backlog</h3>
				<ol>
					<li>Make file operations asynchronous</li>
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
					<li>Implement multiselect for snippets to use for current context (necessary?, valuable?)</li>
					<li>Add dependencies fields in nodebook package json (necessary?, valuable?)</li>
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
				<InputsContainer />
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
				{
					!this.props.loading[LoadingEnums.components.application] ?
					this.application() : this.loading()
				}
			</>
        );
    }
}