import { actionWithPayload } from '../../actions';
import { OUTPUTS_DELETE, OUTPUTS_LOG, OUTPUTS_UPDATE } from '../../actions/output/outputs.actions';
import { immutableSplice } from '../../helpers/immutable.helpers';
import { inputReducer } from '../input/input.reducer';

export function outputsReducer(state: any[] = [],
                               action: actionWithPayload<any>): any[] {
  switch (action.type) {
    case OUTPUTS_DELETE: {
      const items = immutableSplice(state, action.id, 1);
      const currentState = [...items];
      // update input store too, because item was removed
      return currentState.map((current, index) =>
        inputReducer(current, action, index + 1)
      )
    }
    case OUTPUTS_LOG: {
      console.log(action.id, action.payload);
      return state.map(output => {
        return Object.assign(
          {},
          output,
          {
            logs: [...output.logs, action.payload]
          });
      });
    }
    case OUTPUTS_UPDATE: {
      // new?
      const newOutputs = action.payload.filter((newOutput) => {
        let isNew = true;
        state.forEach((stateOutput) => {
          if (stateOutput.id === newOutput.id) {
            isNew = false;
          }
        });

        return isNew;
      });
      // update?
      const updatedOutputs = state.reduce((prev, next) => {
        let value = next;
        action.payload.forEach(payloadOutput => {
          if (payloadOutput.id === next.id) {
            value = payloadOutput;
          }
        });

        prev.push(value);

        return prev;
      }, [] as any);


      return [...updatedOutputs, ...newOutputs];
    }
    default:
      return state;
  }
}