import * as React from 'react';

interface IComponentProps {
	dependencies: { [key: string]: string };
	devDependencies: { [key: string]: string };
	removeDependency: (payload: string) => {type: string, payload: string};
	removeDevDependency: (payload: string) => {type: string, payload: string};
}

export class InstalledPackagesComponent extends React.Component<IComponentProps> {

	constructor(props) {
		super(props);

		this.handleDependencyRemoveClick = this.handleDependencyRemoveClick.bind(this);
	}

	handleDependencyRemoveClick(dependencyName, isDev = false) {
		if (isDev) {
			this.props.removeDevDependency(dependencyName);
		} else {
			this.props.removeDependency(dependencyName);
		}
	}

	render() {
		return (
			<div>
				<h3>
					Installed Packages
				</h3>
				<div>
					(dependencies: {Object.keys(this.props.dependencies).length} /
					devDependencies: {Object.keys(this.props.devDependencies).length})
				</div>
				{(!!(Object.keys(this.props.dependencies).length) ||
				  !!(Object.keys(this.props.devDependencies).length)) &&
                <ul>
					{!!(Object.keys(this.props.dependencies).length) &&
                    <li>
                        Dependencies
                        <ul>
							{Object.keys(this.props.dependencies).map((dependencyKey, i) => {
								return (
									<li key={i}>
										{dependencyKey}: {this.props.dependencies[dependencyKey]}
										<button onClick={() => this.handleDependencyRemoveClick(dependencyKey)}>
											Remove
										</button>
									</li>
								);
							})}
                        </ul>
                    </li>
					}
					{!!(Object.keys(this.props.devDependencies).length) &&
                    <li>
                        Dependencies
                        <ul>
							{Object.keys(this.props.devDependencies).map((devDependencyKey, i) => {
								return (
									<li key={i}>
										{devDependencyKey}: {this.props.devDependencies[devDependencyKey]}
										<button onClick={() => this.handleDependencyRemoveClick(devDependencyKey, true)}>
											Remove
										</button>
									</li>
								);
							})}
                        </ul>
                    </li>
					}
                </ul>
				}
				{!(Object.keys(this.props.dependencies).length) &&
				!(Object.keys(this.props.devDependencies).length) &&
                <ul>
                    <li>Nothing installed</li>
                </ul>
				}
			</div>
		);
	}
}