import { combineEpics } from 'redux-observable';
import { contextInputEpic, newInputEpic } from './inputs.epic';
import { dirtyExecuteFlagOutputEpic, newOutputEpic } from './outputs.epic';

export const rootEpic = combineEpics(
    newInputEpic,
    contextInputEpic,
	newOutputEpic,
    dirtyExecuteFlagOutputEpic
);