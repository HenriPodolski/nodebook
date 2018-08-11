import * as exportInputActions from './input/input.actions';
import * as exportInputsActions from './input/inputs.actions';

export type action = {
    type: string
};

export type actionWithPayload<T> = {
    type: string,
    id?: number,
    payload: T
};

export const inputActions = exportInputActions;
export const inputsActions = exportInputsActions;
