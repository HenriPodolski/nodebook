import { combineEpics } from 'redux-observable';
import { newInputEpic } from './inputs.epic';
import { newOutputEpic } from './outputs.epic';

export const rootEpic = combineEpics(
    newInputEpic,
    newOutputEpic
);