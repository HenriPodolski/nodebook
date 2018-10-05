import { actionWithPayload } from '../../actions';
import { OUTPUTS_UPDATE } from '../../actions/output/outputs.actions';

export function outputsReducer(
    state: any[] = [],
    action: actionWithPayload<any>
): any[] {
    switch (action.type) {
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