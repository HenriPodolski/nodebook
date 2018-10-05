import { actionWithPayload } from '../../actions/index';
import { INPUTS_NAME_CHANGE } from '../../actions/input/inputs.actions';
import { rootState } from '../../store/state';

export function inputNameReducer(
	state: string = rootState.inputs[0].name,
	action: actionWithPayload<string>
) {
	switch (action.type) {
		case INPUTS_NAME_CHANGE:
			return action.payload;
		default:
			return state;
	}
}
