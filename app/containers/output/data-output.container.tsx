import { connect } from 'react-redux';
import { DataOutputComponent } from '../../components/output/data-output.component';

const mapStateToProps = (state, ownProps) => ({
    output: state.outputs[ownProps.index]
});

export const DataOutputContainer = connect(mapStateToProps)(DataOutputComponent);