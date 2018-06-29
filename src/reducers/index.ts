import { combineReducers } from 'redux';
import { editorReducer } from './editor';

export const rootReducer = combineReducers({
    editor: editorReducer
});