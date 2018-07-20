import { connect } from 'react-redux';
import { InputsComponent } from '../components/inputs.component';

const mapStateToProps = state => ({
    inputs: state.inputs,
    debug: state.debug.components
});

export const InputsContainer = connect(mapStateToProps)(InputsComponent);