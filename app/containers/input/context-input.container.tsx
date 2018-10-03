import { connect } from 'react-redux';
import { ContextInputComponent } from '../../components/input/context-input.component';
import { contextChangeAction } from '../../actions/input/inputs.actions';
import { environment } from '../../environments/environment';

const mapStateToProps = (state, ownProps) => {
    const currentContexts = [...environment.config.input.contexts].filter((context) => {
        return state.inputs[ownProps.index].mode === context.mode
    })[0];

    return {
        ctxs: currentContexts,
        ctx: state.inputs[ownProps.index].context
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        changeContext: (state) => {
            return dispatch(contextChangeAction(state, ownProps.index));
        }
    });
};

export const ContextInputContainer = connect(mapStateToProps, mapDispatchToProps)(ContextInputComponent);