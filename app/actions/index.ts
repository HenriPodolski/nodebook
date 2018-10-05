import * as exportInputsActions from './input/inputs.actions';
import * as exportOutputsActions from './output/outputs.actions';

export type action = {
    type: string
};

export type actionWithPayload<T> = {
    type: string,
    id?: number,
    payload: T
};

export const inputsActions = exportInputsActions;
export const outputsActions = exportOutputsActions;
