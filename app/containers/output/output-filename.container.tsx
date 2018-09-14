import { connect } from 'react-redux';
import { OutputFilenameComponent } from '../../components/output/output-filename.component';
import { environment } from '../../environments/environment';
import { nameChangeAction } from '../../actions/input/inputs.actions';

const mapStateToProps = (state, ownProps) => ({
    name: state.inputs[ownProps.index].name,
    mode: state.inputs[ownProps.index].mode,
    validationErrors: [],
    short: environment.config.input.modes.filter((mode) => {
        return mode.value === state.inputs[ownProps.index].mode
    }).map((mode) => {
        return mode.short
    })[0]
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        changeName: (state) => {
            return dispatch(nameChangeAction(state, ownProps.index));
        },
    });
};

export const OutputFilenameContainer = connect(mapStateToProps, mapDispatchToProps)(OutputFilenameComponent);