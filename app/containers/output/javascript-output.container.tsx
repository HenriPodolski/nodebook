import { connect } from 'react-redux';
import {
    executeFlagChangeAction
} from '../../actions/input/inputs.actions';
import { JavascriptOutputComponent } from '../../components/output/javascript-output.component';


const mapStateToProps = (state, ownProps) => ({
    value: state.outputs[ownProps.index].value
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        changeExecuteFlag: (state) => {
            return dispatch(executeFlagChangeAction(state, ownProps.index));
        },
    });
};

export const JavascriptOutputContainer = connect(mapStateToProps, mapDispatchToProps)(JavascriptOutputComponent);