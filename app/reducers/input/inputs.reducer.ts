import { rootState } from '../../store/state';
import { actionWithPayload } from '../../actions';
import {
    INPUTS_NEW
} from '../../actions/input/inputs.actions';
import { inputReducer } from './input.reducer';
import { IInput } from '../../shared/interfaces/input.interface';

export function inputsReducer(
    state: IInput[] = rootState.inputs,
    action: actionWithPayload<any>
): IInput[] {
    switch (action.type) {
        case INPUTS_NEW: {
            const newItem = action.payload;
            const currentState = [...state, newItem];
            return currentState.map((current, index) =>
                inputReducer(current, action, index + 1)
            )
        }
        default:
            // apply action to all inputs
            return state.reduce((previous, next, index) => {
                // console.log(index, action);
                if (index === action.id) {
                    previous = [...previous, inputReducer(next, action, index + 1)];
                } else {
                    previous = [...previous, next];
                }

                return previous;
            }, [] as IInput[]);
    }
}