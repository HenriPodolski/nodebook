import { combineReducers } from 'redux';
import { inputsReducer } from './input';
import { rootState } from '../store/state';

export const rootReducer = combineReducers({
    inputs: inputsReducer,
    debug: (state = rootState.debug) => state
});