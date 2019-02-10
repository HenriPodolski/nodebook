import * as React from 'react';

interface IComponentProps {

}

export class HtmlMapComponent extends React.Component<IComponentProps> {

  state;

  constructor(props) {
    super(props);

    this.state = {};

    if (window.opener) {
      window.addEventListener('message', (evt) => {
        if (window.location.origin !== evt.origin) {
          return;
        }

        try {
          const data = JSON.parse(evt.data);

          if (data.type && data.type === 'htmlStringData') {
            this.setState(data);
          }
        } catch (e) {
          throw new Error(e);
        }
      });

      window.opener.postMessage('ready', window.location.origin);
    }
  }

  render() {
    return (
      <>
        <pre>
          {Object.keys(this.state).length > 0 && JSON.stringify(this.state, null, 4)}
        </pre>
      </>
    );
  }
}