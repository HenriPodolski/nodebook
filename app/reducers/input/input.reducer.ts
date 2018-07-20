import { inputValueReducer } from '../shared/value.reducer';
import { inputHeightReducer } from '../shared/height.reducer';
import { inputModeReducer } from '../shared/mode.reducer';
import { inputThemeReducer } from '../shared/theme.reducer';
import { IInputState, rootState } from '../../store/state';
import { actionWithPayload } from '../../actions';
import { inputReadonlyReducer } from '../shared/readonly.reducer';
import { inputsExecuteFlagReducer } from '../shared/execute-flag.reducer';

export function inputReducer(
    state: IInputState = { ...rootState.inputs[0] },
    action: actionWithPayload<string | boolean>,
    id: number
) {
    switch (action.type) {
        default:
            return {
                ...state,
                id,
                mode: inputModeReducer(state.mode, action as actionWithPayload<string>),
                height: inputHeightReducer(state.height, action as actionWithPayload<string>),
                theme: inputThemeReducer(state.theme, action as actionWithPayload<string>),
                value: inputValueReducer(state.value, action as actionWithPayload<string>),
                readOnly: inputReadonlyReducer(state.readOnly, action as actionWithPayload<boolean>),
                executeFlag: inputsExecuteFlagReducer(state.executeFlag, action as actionWithPayload<string>)
            };
    }
}