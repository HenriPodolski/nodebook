import { combineEpics } from 'redux-observable';
import { newInputEpic } from './inputs.epic';
import { dirtyExecuteFlagOutputEpic, newOutputEpic } from './outputs.epic';

export const rootEpic = combineEpics(
    newInputEpic,
    newOutputEpic,
    dirtyExecuteFlagOutputEpic
);