import { connect } from 'react-redux';

import { CodeInputComponent } from '../../components/input/code-input.component';
import {
    executeFlagChangeAction,
    heightChangeAction, readonlyChangeAction, themeChangeAction,
    valueChangeAction
} from '../../actions/input/inputs.actions';

const mapStateToProps = (state, ownProps) => ({
    mode: state.inputs[ownProps.index].mode,
    theme: state.inputs[ownProps.index].theme,
    height: state.inputs[ownProps.index].height,
    width: state.inputs[ownProps.index].width,
    editor: state.inputs[ownProps.index].editor,
    value: state.inputs[ownProps.index].value,
    readOnly: state.inputs[ownProps.index].readOnly
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        changeValue: (state) => {
            return dispatch(valueChangeAction(state, ownProps.index));
        },
        changeHeight: (state) => {
            return dispatch(heightChangeAction(state, ownProps.index));
        },
        changeTheme: (state) => {
            return dispatch(themeChangeAction(state, ownProps.index));
        },
        changeReadonly: (state) => {
            return dispatch(readonlyChangeAction(state, ownProps.index));
        },
        changeExecuteFlag: (state) => {
            return dispatch(executeFlagChangeAction(state, ownProps.index));
        },
    });
};

export const CodeInputContainer = connect(mapStateToProps, mapDispatchToProps)(CodeInputComponent);