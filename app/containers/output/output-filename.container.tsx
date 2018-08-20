import { connect } from 'react-redux';
import { OutputFilenameComponent } from '../../components/output/output-filename.component';
import { environment } from '../../environments/environment';

const mapStateToProps = (state, ownProps) => ({
    mode: state.inputs[ownProps.index].mode,
    short: environment.config.input.modes.filter((mode) => {
        return mode.value === state.inputs[ownProps.index].mode
    }).map((mode) => {
        return mode.short
    })[0]
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({

    });
};

export const OutputFilenameContainer = connect(mapStateToProps, mapDispatchToProps)(OutputFilenameComponent);