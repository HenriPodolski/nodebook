import { connect } from 'react-redux';
import {
    executeFlagChangeAction
} from '../../actions/input/inputs.actions';
import { JavascriptClientOutputComponent } from '../../components/output/javascript-client-output.component';


const mapStateToProps = (state, ownProps) => ({
    value: state.outputs[ownProps.index].value,
    file: state.outputs[ownProps.index].file,
    index: ownProps.index
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        changeExecuteFlag: (state) => {
            return dispatch(executeFlagChangeAction(state, ownProps.index));
        },
    });
};

export const JavascriptClientOutputContainer = connect(
    mapStateToProps, mapDispatchToProps
)(JavascriptClientOutputComponent);