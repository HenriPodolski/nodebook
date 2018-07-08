import { combineReducers } from 'redux';
import { editorsReducer } from './editor';
import { rootState } from '../store/state';

export const rootReducer = combineReducers({
    editors: editorsReducer,
    debug: (state = rootState.debug) => state
});