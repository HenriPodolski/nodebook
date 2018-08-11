import { connect } from 'react-redux';
import { JavascriptProcessorService } from '../../services/processors/javascript-processor.service';
import {
    executeFlagChangeAction
} from '../../actions/input/inputs.actions';
import { JavascriptOutputComponent } from '../../components/output/javascript-output.component';


const mapStateToProps = (state, ownProps) => ({
    value: state.inputs[ownProps.index].value && JavascriptProcessorService.process(
        state.inputs[ownProps.index].value, state.inputs[ownProps.index].id
    )
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        changeExecuteFlag: (state) => {
            return dispatch(executeFlagChangeAction(state, ownProps.index));
        },
    });
};

export const JavascriptOutputContainer = connect(mapStateToProps, mapDispatchToProps)(JavascriptOutputComponent);