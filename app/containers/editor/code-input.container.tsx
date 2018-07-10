import { connect } from 'react-redux';

import { CodeInputComponent } from '../../components/editor/code-input.component';
import {
    executeFlagChangeAction,
    heightChangeAction, readonlyChangeAction, themeChangeAction,
    valueChangeAction
} from '../../actions/editor/editors.actions';

const mapStateToProps = (state, ownProps) => ({
    mode: state.editors[ownProps.index].mode,
    theme: state.editors[ownProps.index].theme,
    height: state.editors[ownProps.index].height,
    width: state.editors[ownProps.index].width,
    editor: state.editors[ownProps.index].editor,
    value: state.editors[ownProps.index].value,
    readOnly: state.editors[ownProps.index].readOnly
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