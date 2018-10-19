import { combineReducers } from 'redux';
import { rootState } from '../store/state';
import { inputsReducer } from './input';
import { outputsReducer } from './output';
import { loadingReducer } from './loading';

export const rootReducer = combineReducers({
    inputs: inputsReducer,
    outputs: outputsReducer,
    debug: (state = rootState.debug) => state,
    loading: loadingReducer
});