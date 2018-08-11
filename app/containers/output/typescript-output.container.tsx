import { connect } from 'react-redux';
import { TypescriptOutputComponent } from '../../components/output/typescript-output.component';
import { TypescriptProcessorService } from '../../services/processors/typescript-processor.service';
import {
    executeFlagChangeAction
} from '../../actions/input/inputs.actions';


const mapStateToProps = (state, ownProps) => ({
    value: state.inputs[ownProps.index].value && TypescriptProcessorService.process(
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

export const TypescriptOutputContainer = connect(mapStateToProps, mapDispatchToProps)(TypescriptOutputComponent);