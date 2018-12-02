import { combineEpics } from 'redux-observable';
import { contextInputEpic, newInputEpic } from './inputs.epic';
import { dirtyExecuteFlagOutputEpic, newOutputEpic, packageOutputsEpic } from './outputs.epic';
import { initEpic } from './init.epic';
import { deleteConfirmationEpic, deleteConfirmedEpic } from './controls.epic';

export const rootEpic = combineEpics(
	initEpic,
    newInputEpic,
    contextInputEpic,
	newOutputEpic,
    dirtyExecuteFlagOutputEpic,
	packageOutputsEpic,
    deleteConfirmationEpic,
    deleteConfirmedEpic
);