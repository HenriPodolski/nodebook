import * as React from 'react';
import { connect } from 'react-redux';
import { ModeInputComponent } from '../../components/editor/mode-input.component';
import { modeChangeAction } from '../../actions/editor/editor.actions';

const mapStateToProps = (state, ownProps) => ({
    mode: state.editors[ownProps.index].mode
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        changeMode: (state) => {
            return dispatch(modeChangeAction(state));
        }
    });
};

export const ModeInputContainer = connect(mapStateToProps, mapDispatchToProps)(ModeInputComponent);