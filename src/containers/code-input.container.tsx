import * as React from 'react';
import { connect } from 'react-redux';

import { CodeInputComponent } from '../components/code-input.component';
import {
    heightChangeAction, themeChangeAction,
    valueChangeAction
} from '../actions/editor/editor.actions';

const mapStateToProps = state => ({
    mode: state.editor.mode,
    value: state.editor.value,
    height: state.editor.height,
    theme: state.editor.theme
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