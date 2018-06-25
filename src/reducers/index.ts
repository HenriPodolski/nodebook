import { combineReducers } from 'redux';
import { modeReducer } from './mode.reducer';

export const rootReducer = combineReducers({
    mode: modeReducer
});