import { connect } from 'react-redux';
import { TypescriptOutputComponent } from '../../components/output/typescript-output.component';
import { TypescriptProcessorService } from '../../services/processors/typescript-processor.service';
import {
    executeFlagChangeAction
} from '../../actions/editor/editor.actions';


const mapStateToProps = (state, ownProps) => ({
    value: TypescriptProcessorService.process(
        state.editors[ownProps.index].value
    )
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        changeExecuteFlag: (state) => {
            return dispatch(executeFlagChangeAction(state));
        },
    });
};

export const TypescriptOutputContainer = connect(mapStateToProps, mapDispatchToProps)(TypescriptOutputComponent);