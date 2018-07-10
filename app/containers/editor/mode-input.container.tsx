import { connect } from 'react-redux';
import { ModeInputComponent } from '../../components/editor/mode-input.component';
import { modeChangeAction } from '../../actions/editor/editors.actions';

const mapStateToProps = (state, ownProps) => ({
    mode: state.editors[ownProps.index].mode,
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