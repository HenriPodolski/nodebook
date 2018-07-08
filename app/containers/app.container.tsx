import * as React from 'react';

export class AppContainer extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
