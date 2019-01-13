import * as React from 'react';
import { InputsContainer } from '../containers/inputs.container';
import { LoadingEnums } from '../enums/loading.enums';
import { ModalDialogContainer } from '../containers/controls/modal-dialog.container';
import { ITitle } from '../shared/interfaces/title.interface';
import { RefObject } from 'react';
import { todos } from './todos.component';
import { PackagesContainer } from '../containers/packages.container';

let styles = require('./app.component.scss');

interface IComponentProps {
	configurePackages: boolean;
	title: ITitle;
	debug: string;
	loading: any;
	init: () => { type: string };
	updateTitle: (title: string) => { type: string, title: string };
	editTitle: () => { type: string };
	cancelEditTitle: () => { type: string };
}

export class AppComponent extends React.Component<IComponentProps> {

	titleInputRef: RefObject<HTMLInputElement>;

	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
		this.handleEditCancelClick = this.handleEditCancelClick.bind(this);

		this.titleInputRef = React.createRef();
	}

	componentWillMount() {
		this.props.init();
	}

	todos() {

		return (
			<>
				{this.props.debug && (
					<>
						{todos()}
					</>
				)}
			</>
		);
	}

	handleSubmit(evt) {
		evt.preventDefault();
		const form = evt.target;
		const title = form.title.value;
		this.props.updateTitle(title);
	}

	handleEditClick(evt) {
		evt.preventDefault();
		this.props.editTitle();
	}

	handleEditCancelClick(evt) {
		evt.preventDefault();
		this.props.cancelEditTitle();
	}

	application() {
		console.log('this.props.loading[LoadingEnums.components.userinterface]',
			this.props.loading[LoadingEnums.components.userinterface]);

		return (
			<>
				<div className={styles.AppComponent}>
					{this.props.title.valid && !this.props.title.edit &&
                    <div>
                        <h1 className={styles.AppComponent__Title}>{this.props.title.text}</h1>
                        <button onClick={this.handleEditClick}>Edit</button>
                    </div>}
					{(!this.props.title.valid || this.props.title.edit) &&
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <label htmlFor="title">Title</label>
                            <input
                                ref={this.titleInputRef}
                                id="title"
                                name="title"
                                type="text"
                                defaultValue={this.props.title.text}
                            />
                            <button type="submit">Save</button>
							{this.props.title.valid &&
                            <button onClick={this.handleEditCancelClick}>Cancel</button>}
							{!this.props.title.valid && this.titleInputRef && this.titleInputRef.current &&
                            <div className={styles.AppComponent__Error}>
                                "{this.titleInputRef.current.value}" is not a valid title.
                            </div>
							}
                        </fieldset>
                    </form>
					}
					{(this.props.title.valid && !this.props.title.edit) &&
                    <PackagesContainer/>}
					{(this.props.title.valid && !this.props.title.edit) && !this.props.configurePackages &&
                    <InputsContainer/>}
					{this.todos()}
				</div>
				{this.props.loading[LoadingEnums.components.userinterface] &&
					this.loading(LoadingEnums.components.userinterface)}
			</>
		);
	}

	loading(loader: string = LoadingEnums.components.application) {
		let usedLoader = styles.AppComponent__Loading;

		if (loader === LoadingEnums.components.userinterface) {
			usedLoader = styles.AppComponent__UILoading;
		}

		return (
			<div className={usedLoader}>
				<div>Loading...</div>
			</div>
		);
	}

	modal() {
		return <ModalDialogContainer></ModalDialogContainer>;
	}


	render() {
		return (
			<>
				{
					!this.props.loading[LoadingEnums.components.application] ?
						(<>{this.modal()}{this.application()}</>) : this.loading()
				}
			</>
		);
	}
}
