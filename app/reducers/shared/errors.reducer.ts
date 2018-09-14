import { actionWithPayload } from '../../actions/index';
import { rootState } from '../../store/state';
import { INPUT_VALIDATION_ERRORS_CHANGE } from '../../actions/input/input.actions';
import { IErrorsInterface } from '../../shared/interfaces/errors.interface';
import { INPUTS_VALIDATION_ERRORS_CHANGE } from '../../actions/input/inputs.actions';

export function inputErrorsReducer(
    state: {[key: string]: IErrorsInterface[]} = rootState.inputs[0].errors,
    action: actionWithPayload<{[key: string]: IErrorsInterface[]}>
) {

    console.log('inputErrorsReducer', action.type, action.payload);

    switch (action.type) {
        case INPUT_VALIDATION_ERRORS_CHANGE:
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