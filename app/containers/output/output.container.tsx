import { connect } from 'react-redux';
import { OutputComponent } from '../../components/output/output.component';
import {
    executeFlagChangeAction
} from '../../actions/input/inputs.actions';

const mapStateToProps = (state, ownProps) => ({
    value: state.inputs[ownProps.index].value,
    mode: state.inputs[ownProps.index].mode,
    executeFlag: state.inputs[ownProps.index].executeFlag,
    index: ownProps.index
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        changeExecuteFlag: (state) => {
            return dispatch(executeFlagChangeAction(state, ownProps.index));
        },
    });
};

export const OutputContainer = connect(mapStateToProps, mapDispatchToProps)(OutputComponent);