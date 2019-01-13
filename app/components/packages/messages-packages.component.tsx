import * as React from 'react';

interface IComponentProps {
	messages: string[]
}

export class MessagesPackagesComponent extends React.Component<IComponentProps> {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<>
				{!!this.props.messages.length &&
                <>
                    <h4>Logs:</h4>
                    <ul>
						{
							this.props.messages.map((message, key) => {
								return (
									<li key={key}>{message}</li>
								);
							})
						}
                    </ul>
                </>
				}
			</>
		);
	}
}