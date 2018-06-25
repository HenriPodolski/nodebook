import * as exportModeActions from './mode.actions';

export type action = {
    type: string
};

export type actionWithPayload = {
    type: string,
    payload: any
};

export const modeActions = exportModeActions;
