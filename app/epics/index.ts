import { combineEpics } from 'redux-observable';
import { contextInputEpic, markInputsForExecutionEpic, newInputEpic } from './inputs.epic';
import { dirtyExecuteFlagOutputEpic, newOutputEpic, outputsUpdateEpic } from './outputs.epic';
import {checkNpmInstallationEpic, initEpic} from './init.epic';
import { deleteConfirmationEpic, deleteConfirmedEpic } from './controls.epic';
import { updateTitleEpic } from './title.epic';
import {
	mirrorDependenciesToStoreEpic,
	performInstallEpic,
	performQueryEpic, removeDependencyEpic,
	resetQueryEpic,
	startInstallLoaderEpic
} from './packages.epic';
import { startExternalMappingEpic } from './html-map.epic';

export const rootEpic = combineEpics(
	initEpic,
	checkNpmInstallationEpic,
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
	performInstallEpic,
	mirrorDependenciesToStoreEpic,
	removeDependencyEpic,
	startExternalMappingEpic
);