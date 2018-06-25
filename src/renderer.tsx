import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AppComponent } from './components/app.component';
import { configureStore } from './store';
import { Provider } from 'react-redux';
import { rootState } from './store/state';

const store = configureStore(rootState);

ReactDOM.render(
    <Provider store={store}>
        <AppComponent />
    </Provider>,
    document.querySelector('#root')
);
