import * as React from 'react';

export class AppContainer extends React.Component {
  render() {
    return (
      <>
        {this.props.children}
      </>
    );
  }
}
