import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createHashHistory } from 'history';
import { createLogger } from 'redux-logger';
import { rootReducer } from '../reducers';
import { rootEpic } from '../epics';
import { editorActions } from '../actions';

const history = createHashHistory();

declare const window: Window & {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(a: any): void;
};

const configureStore = (initialState?: any) => {
    // Redux Configuration
    const epicMiddleware = createEpicMiddleware();
    // Logging Middleware
    const logger = createLogger({
        level: 'info',
        collapsed: true
    });

    const actionCreators = {
        modeActions: editorActions
    } as any;

    const middleware = [
        epicMiddleware,
        logger
    ];

    const composeEnhancers: typeof compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            actionCreators
        }) as any :
        compose;

    // Create Store
    const store = createStore(rootReducer, initialState, composeEnhancers(
        applyMiddleware(
            ...middleware
        )
    ));

    epicMiddleware.run(rootEpic);

    return store;
};

export { configureStore, history };