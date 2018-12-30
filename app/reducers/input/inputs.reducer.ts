import { rootState } from '../../store/state';
import { actionWithPayload } from '../../actions';
import {
  INPUTS_DELETE,
  INPUTS_NEW, INPUTS_REORDER
} from '../../actions/input/inputs.actions';
import { inputReducer } from './input.reducer';
import { IInput } from '../../shared/interfaces/input.interface';
import { immutableSplice } from '../../helpers/immutable.helpers';
import { InputEnums } from '../../enums/input.enums';

export function inputsReducer(state: IInput[] = rootState.inputs,
                              action: actionWithPayload<any>): IInput[] {
  switch (action.type) {
    case INPUTS_REORDER: {
      const sourceId = action.payload.sourceId;
      const targetId = action.payload.targetId;
      const result = Array.from([...state]);
      const [removed] = result.splice(sourceId, 1);
      result.splice(targetId, 0, removed)
        .map((current, index) => {
          current.executeFlag = InputEnums.executeFlags.idle;
          return inputReducer(current, action, index + 1)
        });

      return result;
    }
    case INPUTS_NEW: {
      const newItem = action.payload;
      const currentState = [...state, newItem];
      return currentState.map((current, index) =>
        inputReducer(current, action, index + 1)
      )
    }
    case INPUTS_DELETE: {
      const items = immutableSplice(state, action.id, 1).map((item, index) => {
        return inputReducer(item, action, index + 1);
      });

      return [...items];
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