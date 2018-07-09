import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { rootReducer } from '../reducers';
import { rootEpic } from '../epics';

const history = createBrowserHistory();
const router = routerMiddleware(history);
const epicMiddleware = createEpicMiddleware();
const enhancer = applyMiddleware(epicMiddleware, router);

export = {
  history,
  configureStore(initialState: Object | void) {
    const store = createStore(rootReducer, initialState as Object, enhancer);
    epicMiddleware.run(rootEpic);
    return store;
  }
};
