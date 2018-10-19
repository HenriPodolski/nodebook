import { action } from '../../actions';
import { INIT } from '../../actions/init/init.actions';

export function initReducer(
	state: boolean = false,
	action: action
): boolean {
	switch (action.type) {
		case INIT: {
			return true;
		}

		default:
			return state;
	}
}