import { combineEpics } from 'redux-observable';
import { newInputEpic } from './inputs.epic';

export const rootEpic = combineEpics(
    newInputEpic
);