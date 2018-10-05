import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createHashHistory } from 'history';
import { routerMiddleware, push } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { rootReducer } from '../reducers';
import { inputsActions, outputsActions } from '../actions';
import { rootState } from './state';
import { rootEpic } from '../epics';

declare const window: Window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(a: any): void;
};

declare const module: NodeModule & {
  hot?: {
    accept(...args: any[]): any;
  }
};

const actionCreators = Object.assign({},
	outputsActions,
    inputsActions,
  {push}
);

let logger;

if (rootState.debug.store) {
	logger = (<any>createLogger)({
		level: rootState.debug.store,
		collapsed: true
	});
}

const history = createHashHistory();
const epicMiddleware = createEpicMiddleware();
const router = routerMiddleware(history);

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers: typeof compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
    actionCreators
  }) as any :
  compose;
/* eslint-enable no-underscore-dangle */
const enhancer = composeEnhancers(
	logger ? applyMiddleware(epicMiddleware, router, logger) :
		applyMiddleware(epicMiddleware, router)
);

export = {
  history,
  configureStore(initialState: Object | void) {
    const store = createStore(rootReducer, initialState as Object, enhancer);

    if (module.hot) {
      module.hot.accept('../reducers', () =>
        store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
      );
    }

    epicMiddleware.run(rootEpic);

    return store;
  }
};
