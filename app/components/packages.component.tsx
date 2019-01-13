import * as React from 'react';
import { InstalledPackagesContainer } from '../containers/packages/installed-packages.container';
import { MessagesPackagesContainer } from '../containers/packages/messages-packages.container';

interface IComponentProps {
  configure: boolean;
  packagesAutocomplete: {query: string, found: any[]};
  stageDependencyAction: (dependency: string) => { type: string, payload: string };
  stageDevDependencyAction: (dependency: string) => { type: string, payload: string };
  config: () => { type: string };
  cancelConfig: () => { type: string };
  query: (query: string) => { type: string, payload: string }
}

export class PackagesComponent extends React.Component<IComponentProps> {

  state;

  formRef;

  devInput;

  constructor(props) {
    super(props);

    this.handlePackageConfiguration = this.handlePackageConfiguration.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePackageSuggestChange = this.handlePackageSuggestChange.bind(this);
    this.handleCancelPackageConfiguration = this.handleCancelPackageConfiguration.bind(this);
    this.handleAutosuggestClick = this.handleAutosuggestClick.bind(this);
    this.handleAutosuggestKeyPress = this.handleAutosuggestKeyPress.bind(this);
    this.handleDependencyInstallClick = this.handleDependencyInstallClick.bind(this);
    this.handleDevDependencyInstallClick = this.handleDevDependencyInstallClick.bind(this);

    this.formRef = React.createRef();
    this.devInput = React.createRef();

    this.state = {
      package: ''
    };
  }

  changeQueryAndState(value) {
    this.setState({package: value});
    this.props.query(value);
  }

  resetQueryAndChangeState(value) {
    this.setState({package: value});
    // reset autosuggest
    this.props.query('');
  }

  setDevCheckbox(checked: boolean) {
    if (this.devInput.current) {
      this.devInput.current.checked = checked;
    }
  }

  handlePackageConfiguration(evt) {
    evt.preventDefault();

    this.props.config();
  }

  handleCancelPackageConfiguration(evt) {
    evt.preventDefault();

    this.props.cancelConfig();
  }

  handleDependencyInstallClick() {
    const form = this.formRef.current;
    console.info(`Perform install of ${form.package.value} as dependency!`);

    if (form.package && form.package.value) {
      this.props.stageDependencyAction(form.package.value);
      this.changeQueryAndState('');
      this.setDevCheckbox(false);
    }
  }

  handleDevDependencyInstallClick() {
    const form = this.formRef.current;
    console.info(`Perform install of ${form.package.value} as devDependency!`);

    if (form.package && form.package.value) {
      this.props.stageDevDependencyAction(form.package.value);
      this.changeQueryAndState('');
      this.setDevCheckbox(false);
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
  }

  handlePackageSuggestChange(evt) {
    this.changeQueryAndState(evt.target.value);
  }

  handleAutosuggestClick(value) {
    this.resetQueryAndChangeState(value);
  }

  handleAutosuggestKeyPress(evt, value) {
    if (evt.key === 'Enter') {
      this.resetQueryAndChangeState(value);
    }
  }

  autosuggest() {
    return (
      <div>
        <input value={this.state.package} id="package" name="package" onChange={this.handlePackageSuggestChange} />
        <label htmlFor="dev-package">
          devDependency <input ref={this.devInput} type="checkbox" value="1" name="dev-package" />
        </label>
        {!!this.props.packagesAutocomplete.found.length &&
          <ul>
          {this.props.packagesAutocomplete.found.map((item, i) => {
            return (
              <li
                  tabIndex={0}
                  key={i}
                  onKeyPress={(evt) => this.handleAutosuggestKeyPress(evt, item.name)}
                  onClick={() => this.handleAutosuggestClick(item.name)}
              >
                {item.name}
              </li>
            )
          })}
          </ul>
        }
      </div>
    );
  }

  render() {
    return (
      <>
        <InstalledPackagesContainer />
        {!this.props.configure &&
        <div>
          Packages <button onClick={this.handlePackageConfiguration}>Configure</button>
        </div>}
        {this.props.configure &&
        <div>
          Config <button onClick={this.handleCancelPackageConfiguration}>Done</button>
          <form ref={this.formRef} onSubmit={this.handleSubmit}>
            <fieldset>
              <label htmlFor="package">NPM package</label>
              {this.autosuggest()}
              {!!this.devInput && !!this.devInput.current &&
              <button
                  onClick={this.devInput.current.checked ?
                      this.handleDevDependencyInstallClick :
                      this.handleDependencyInstallClick}
              >
                Install
              </button>
              }
              <MessagesPackagesContainer />
            </fieldset>
          </form>
        </div>}
      </>
    );
  }
}