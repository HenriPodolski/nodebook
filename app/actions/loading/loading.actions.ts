import { ILoading } from '../../shared/interfaces/loading.interface';

export const LOADING_UPDATE = 'LOADING_UPDATE';
export const LOADING_START = 'LOADING_START';
export const LOADING_STOP = 'LOADING_STOP';
export const LOADING_STATE = 'LOADING_STATE';


export function updateAction(payload: ILoading) {
	return {
		type: LOADING_UPDATE,
		payload
	};
}

export function startAction(payload: string) {
	return {
		type: LOADING_START,
		payload
	};
}

export function stopAction(payload: string) {
	return {
		type: LOADING_STOP,
		payload
	};
}

export function stateAction() {
	return {
		type: LOADING_STATE
	};
}