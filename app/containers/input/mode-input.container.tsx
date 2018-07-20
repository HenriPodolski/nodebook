import { connect } from 'react-redux';
import { ModeInputComponent } from '../../components/input/mode-input.component';
import { modeChangeAction } from '../../actions/input/inputs.actions';

const mapStateToProps = (state, ownProps) => ({
    mode: state.inputs[ownProps.index].mode,
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        changeMode: (state) => {
            console.log(ownProps.index);
            return dispatch(modeChangeAction(state, ownProps.index));
        }
    });
};

export const ModeInputContainer = connect(mapStateToProps, mapDispatchToProps)(ModeInputComponent);