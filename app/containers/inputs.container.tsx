import { connect } from 'react-redux';
import { InputsComponent } from '../components/inputs.component';
import { reorderAction } from '../actions/input/inputs.actions';
import { startExternalAction } from '../actions/html-map/html-map.actions';

const mapStateToProps = state => ({
    inputs: state.inputs,
    outputs: state.outputs,
    debug: state.debug.components
});

const mapDispatchToProps = (dispatch) => {
  return ({
    reorder: (payload: {sourceId: number, targetId: number}) => {
      return dispatch(reorderAction(payload));
    },
    mapHtml: (payload: {index: number, browserWindow: any}) => {
        return dispatch(startExternalAction(payload));
    }
  });
};

export const InputsContainer = connect(mapStateToProps, mapDispatchToProps)(InputsComponent);