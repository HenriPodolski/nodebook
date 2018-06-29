import * as React from 'react';
import { connect } from 'react-redux';
import { ModeInputComponent } from '../components/mode-input.component';
import { modeChangeAction } from '../actions/editor/editor.actions';

const mapStateToProps = state => ({
    mode: state.editor.mode,
    theme: state.editor.theme,
    height: state.editor.height,
    width: state.editor.width,
    editor: state.editor.editor,
    value: state.editor.value
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        changeMode: (state) => {
            return dispatch(modeChangeAction(state));
        }
    });
};

export const ModeInputContainer = connect(mapStateToProps, mapDispatchToProps)(ModeInputComponent);