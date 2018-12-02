import { combineReducers } from 'redux';
import { rootState } from '../store/state';
import { inputsReducer } from './input';
import { outputsReducer } from './output';
import { loadingReducer } from './loading';
import { modalDialogReducer } from './controls';
import { initReducer } from './init';

export const rootReducer = combineReducers({
    inputs: inputsReducer,
    outputs: outputsReducer,
    controls: combineReducers({
        modalDialog: modalDialogReducer
    }),
    debug: (state = rootState.debug) => state,
    loading: loadingReducer,
    init: initReducer
});