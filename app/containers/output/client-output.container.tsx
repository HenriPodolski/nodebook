import { connect } from 'react-redux';
import {
  executeFlagChangeAction
} from '../../actions/input/inputs.actions';
import { ClientOutputComponent } from '../../components/output/client-output.component';
import { ModeEnums } from '../../enums/mode.enums';
import { ContextEnums } from '../../enums/contexts.enums';
import { logAction } from '../../actions/output/outputs.actions';


const mapStateToProps = (state, ownProps) => ({
  // select which uses outputs created before the current index
  // and which should be available for the client
  outputs: state.outputs.filter((output, index) => {
    const isAvailableOutputInScope = ownProps.index >= index;
    const isClientJS = output.mode === ModeEnums.js.value && output.context === ContextEnums.js.client;
    const isClientTS = output.mode === ModeEnums.ts.value && output.context === ContextEnums.ts.client;
    const isClientCSS = output.mode === ModeEnums.css.value;
    const isClientJSON = output.mode === ModeEnums.json.value;
    const isClientHTML = output.mode === ModeEnums.html.value;

    return isAvailableOutputInScope &&
      (isClientJS || isClientTS || isClientJSON || isClientCSS || isClientHTML);
  }),
  index: ownProps.index
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    changeExecuteFlag: (state) => {
      return dispatch(executeFlagChangeAction(state, ownProps.index));
    },
    log: (log) => {
      return dispatch(logAction({log, id: ownProps.index}));
    },
  });
};

export const ClientOutputContainer = connect(
  mapStateToProps, mapDispatchToProps
)(ClientOutputComponent);