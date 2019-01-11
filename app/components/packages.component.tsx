import * as React from 'react';

interface IComponentProps {
  configure: boolean;
  packagesAutocomplete: {query: string, found: any[]};
  config: () => { type: string };
  cancelConfig: () => { type: string };
  query: (query: string) => { type: string, payload: string }
}

export class PackagesComponent extends React.Component<IComponentProps> {

  constructor(props) {
    super(props);

    this.handlePackageConfiguration = this.handlePackageConfiguration.bind(this);
    this.handlePackageInstall = this.handlePackageInstall.bind(this);
    this.handlePackageInputChange = this.handlePackageInputChange.bind(this);
    this.handlePackageSuggestChange = this.handlePackageSuggestChange.bind(this);
    this.handleCancelPackageConfiguration = this.handleCancelPackageConfiguration.bind(this);
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
  }

  handlePackageInputChange(evt) {
    console.log(evt);
  }

  handlePackageSuggestChange(evt) {
    this.props.query(evt.target.value);
  }

  autosuggest() {
    return (
      <div>
        <input id="package" name="package" onChange={this.handlePackageSuggestChange} />
        {this.props.packagesAutocomplete.found.map((item, i) => {
          return (
            <div key={i}>
              {item.name}
            </div>
          )
        })}
      </div>
    );
  }

  render() {
    return (
      <>
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
          <h3>Installed Packages</h3>
          <ul>
            <li>...</li>
          </ul>
        </div>}
      </>
    );
  }
}