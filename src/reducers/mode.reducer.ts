import { MODE_CHANGE } from '../actions/mode.actions';
import { actionWithPayload } from '../actions';
import { rootState } from '../store/state';

export function modeReducer(state: string = rootState.mode, action: actionWithPayload) {
    switch (action.type) {
        case MODE_CHANGE:
            return action.payload;
        default:
            return state;
    }
}