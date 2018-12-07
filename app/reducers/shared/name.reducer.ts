import { actionWithPayload } from '../../actions/index';
import { INPUTS_NAME_CHANGE } from '../../actions/input/inputs.actions';

export function inputNameReducer(
	state: string,
	action: actionWithPayload<string>
) {
	switch (action.type) {
		case INPUTS_NAME_CHANGE:
			return action.payload;
		default:
			return state;
	}
}
