import { combineEpics } from 'redux-observable';
import { newEditorEpic } from './editors.epic';

export const rootEpic = combineEpics(
    newEditorEpic
);