export const INIT = 'INIT';
export const INIT_STATE = 'INIT_STATE';


export function initAction() {
	return {
		type: INIT
	};
}

export function stateAction() {
	return {
		type: INIT_STATE
	};
}