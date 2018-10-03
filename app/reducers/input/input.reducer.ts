import { inputValueReducer } from '../shared/value.reducer';
import { inputHeightReducer } from '../shared/height.reducer';
import { inputModeReducer } from '../shared/mode.reducer';
import { inputThemeReducer } from '../shared/theme.reducer';
import { rootState } from '../../store/state';
import { actionWithPayload } from '../../actions';
import { inputsExecuteFlagReducer } from '../shared/execute-flag.reducer';
import { inputNameReducer } from '../shared/name.reducer';
import { IInput } from '../../shared/interfaces/input.interface';
import { IErrorsInterface } from '../../shared/interfaces/errors.interface';
import { inputErrorsReducer } from '../shared/errors.reducer';
import { inputContextReducer } from '../shared/context.reducer';

export function inputReducer(
    state: IInput = { ...rootState.inputs[0] },
    action: actionWithPayload<string | boolean | {[key: string]: IErrorsInterface[]}>,
    id: number
) {
    switch (action.type) {
        default:
            return {
                ...state,
                id,
                name: inputNameReducer(state.name, action as actionWithPayload<string>),
                errors: inputErrorsReducer(
                    state.errors, action as actionWithPayload<{[key: string]: IErrorsInterface[]}>
                ),
                mode: inputModeReducer(state.mode, action as actionWithPayload<string>),
                context: inputContextReducer(state.context, action as actionWithPayload<string>),
                height: inputHeightReducer(state.height, action as actionWithPayload<string>),
                theme: inputThemeReducer(state.theme, action as actionWithPayload<string>),
                value: inputValueReducer(state.value, action as actionWithPayload<string>),
                executeFlag: inputsExecuteFlagReducer(state.executeFlag, action as actionWithPayload<string>)
            };
    }
}