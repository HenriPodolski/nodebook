import * as React from 'react';
import { connect } from 'react-redux';

import { CodeInputComponent } from '../../components/editor/code-input.component';
import {
    heightChangeAction, themeChangeAction,
    valueChangeAction
} from '../../actions/editor/editor.actions';

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
            return dispatch(valueChangeAction(state));
        },
        changeHeight: (state) => {
            return dispatch(heightChangeAction(state));
        },
        changeTheme: (state) => {
            return dispatch(themeChangeAction(state));
        },
    });
};

export const CodeInputContainer = connect(mapStateToProps, mapDispatchToProps)(CodeInputComponent);