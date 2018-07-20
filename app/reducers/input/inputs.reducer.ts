import { IInputState, rootState } from '../../store/state';
import { actionWithPayload } from '../../actions';
import {
    INPUTS_NEW
} from '../../actions/input/inputs.actions';
import { inputReducer } from './input.reducer';

export function inputsReducer(
    state: IInputState[] = rootState.inputs,
    action: actionWithPayload<any>
): IInputState[] {
    switch (action.type) {
        case INPUTS_NEW: {
            const newItem = action.payload;
            const currentState = [...state, newItem];
            return currentState.map((current, index) =>
                inputReducer(current, action, index)
            )
        }
        default:
            // apply action to all inputs
            return state.reduce((previous, next, index) => {
                console.log(index, action);
                if (index === action.id) {
                    previous = [...previous, inputReducer(next, action, index)];
                } else {
                    previous = [...previous, next];
                }

                return previous;
            }, [] as IInputState[]);
    }
}