import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import './app.global.scss';
import RootContainer from './containers/root.container';

const { configureStore, history } = require('./store/configureStore');
const store = configureStore();

render(
  <AppContainer>
    <RootContainer store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if ((module as any).hot) {
  (module as any).hot.accept('./containers/root.container', () => {
    const NextRoot = require('./containers/root.container').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
