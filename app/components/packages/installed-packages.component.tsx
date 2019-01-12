import * as React from 'react';

interface IComponentProps {

}

export class InstalledPackagesComponent extends React.Component<IComponentProps> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <h3>Installed Packages</h3>
          <ul>
            <li>...</li>
          </ul>
        </div>
    );
  }
}