import * as React from 'react';

interface IComponentProps {
  configure: boolean;
  config: () => { type: string };
  cancelConfig: () => { type: string };
}

export class PackagesComponent extends React.Component<IComponentProps> {

  constructor(props) {
    super(props);

    this.handlePackageConfiguration = this.handlePackageConfiguration.bind(this);
    this.handlePackageInstall = this.handlePackageInstall.bind(this);
    this.handlePackageInputChange = this.handlePackageInputChange.bind(this);
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

  handlePackageInputChange(evt) {
    const value = evt.target.value;

    console.info('Do autocomplete lookup with', value, 'if size is 2');
  }

  handlePackageInstall(evt) {
    evt.preventDefault();

    console.info(`Perform install of ${evt.target.package.value} !`);
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
              <input type="text" id="package" name="package" onChange={this.handlePackageInputChange} />
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