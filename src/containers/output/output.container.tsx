import * as React from 'react';
import { connect } from 'react-redux';
import { OutputComponent } from '../../components/output/output.component';
import {
    executeFlagChangeAction
} from '../../actions/editor/editor.actions';

const mapStateToProps = (state, ownProps) => ({
    value: state.editors[ownProps.index].value,
    mode: state.editors[ownProps.index].mode,
    executeFlag: state.editors[ownProps.index].executeFlag,
    index: ownProps.index
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        changeExecuteFlag: (state) => {
            return dispatch(executeFlagChangeAction(state));
        },
    });
};

export const OutputContainer = connect(mapStateToProps, mapDispatchToProps)(OutputComponent);