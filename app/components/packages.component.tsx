import * as React from 'react';
import { InstalledPackagesContainer } from '../containers/packages/installed-packages.container';

interface IComponentProps {
  configure: boolean;
  packagesAutocomplete: {query: string, found: any[]};
  addDependency: (dependency: string) => { type: string, payload: string }
  config: () => { type: string };
  cancelConfig: () => { type: string };
  query: (query: string) => { type: string, payload: string }
}

export class PackagesComponent extends React.Component<IComponentProps> {

  state;

  constructor(props) {
    super(props);

    this.handlePackageConfiguration = this.handlePackageConfiguration.bind(this);
    this.handlePackageInstall = this.handlePackageInstall.bind(this);
    this.handlePackageSuggestChange = this.handlePackageSuggestChange.bind(this);
    this.handleCancelPackageConfiguration = this.handleCancelPackageConfiguration.bind(this);
    this.handleAutosuggestClick = this.handleAutosuggestClick.bind(this);
    this.handleAutosuggestKeyPress = this.handleAutosuggestKeyPress.bind(this);

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

  handlePackageConfiguration(evt) {
    evt.preventDefault();

    this.props.config();
  }

  handleCancelPackageConfiguration(evt) {
    evt.preventDefault();

    this.props.cancelConfig();
  }

  handlePackageInstall(evt) {
    evt.preventDefault();

    console.info(`Perform install of ${evt.target.package.value} !`);

    if (evt.target.package && evt.target.package.value) {
      this.props.addDependency(evt.target.package.value);
      this.changeQueryAndState('');
    }
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
          <form onSubmit={this.handlePackageInstall}>
            <fieldset>
              <label htmlFor="package">NPM package</label>
              {this.autosuggest()}
              <button type="submit">Install</button>
            </fieldset>
          </form>
        </div>}
      </>
    );
  }
}