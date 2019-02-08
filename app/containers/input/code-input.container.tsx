import { connect } from 'react-redux';

import { CodeInputComponent } from '../../components/input/code-input.component';
import {
    executeFlagChangeAction,
    heightChangeAction, themeChangeAction,
    valueChangeAction
} from '../../actions/input/inputs.actions';
import { OutputEnums } from '../../enums/output.enums';

const mapStateToProps = (state, ownProps) => ({
    index: ownProps.index,
    mode: state.inputs[ownProps.index].mode,
    theme: state.inputs[ownProps.index].theme,
    height: state.inputs[ownProps.index].height,
    width: state.inputs[ownProps.index].width,
    editor: state.inputs[ownProps.index].editor,
    value: state.inputs[ownProps.index].value,
    readOnly: state.outputs[ownProps.index] &&
        state.outputs[ownProps.index].executeFlag === OutputEnums.executeFlags.processed
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
        changeExecuteFlag: (state) => {
            return dispatch(executeFlagChangeAction(state, ownProps.index));
        },
    });
};

export const CodeInputContainer = connect(mapStateToProps, mapDispatchToProps)(CodeInputComponent);