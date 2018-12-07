import { actionWithPayload } from '../../actions/index';
import { IErrorsInterface } from '../../shared/interfaces/errors.interface';
import { INPUTS_VALIDATION_ERRORS_CHANGE } from '../../actions/input/inputs.actions';

export function inputErrorsReducer(
    state: {[key: string]: IErrorsInterface[]},
    action: actionWithPayload<{[key: string]: IErrorsInterface[]}>
) {
    switch (action.type) {
        case INPUTS_VALIDATION_ERRORS_CHANGE: {
            return {
                ...state,
                ...action.payload
            };
        }
        default:
            return state;
    }
}