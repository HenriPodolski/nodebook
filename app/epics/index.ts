import { combineEpics } from 'redux-observable';
import { contextInputEpic, newInputEpic } from './inputs.epic';
import { dirtyExecuteFlagOutputEpic, newOutputEpic, packageOutputsEpic } from './outputs.epic';
import { initEpic } from './init.epic';

export const rootEpic = combineEpics(
	initEpic,
    newInputEpic,
    contextInputEpic,
	newOutputEpic,
    dirtyExecuteFlagOutputEpic,
	packageOutputsEpic
);