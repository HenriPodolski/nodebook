import { combineEpics } from 'redux-observable';
import { contextInputEpic, markInputsForExecutionEpic, newInputEpic } from './inputs.epic';
import { dirtyExecuteFlagOutputEpic, newOutputEpic, outputsUpdateEpic } from './outputs.epic';
import { initEpic } from './init.epic';
import { deleteConfirmationEpic, deleteConfirmedEpic } from './controls.epic';
import { updateTitleEpic } from './title.epic';
import { performInstallEpic, performQueryEpic, resetQueryEpic, startInstallLoaderEpic } from './packages.epic';

export const rootEpic = combineEpics(
	initEpic,
	newInputEpic,
	contextInputEpic,
	newOutputEpic,
	dirtyExecuteFlagOutputEpic,
	outputsUpdateEpic,
	deleteConfirmationEpic,
	deleteConfirmedEpic,
	markInputsForExecutionEpic,
	updateTitleEpic,
	performQueryEpic,
	resetQueryEpic,
	startInstallLoaderEpic,
	performInstallEpic
);