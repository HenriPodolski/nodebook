import { connect } from 'react-redux';
import { LogsOutputComponent } from '../../components/output/logs-output.component';

const mapStateToProps = (state, ownProps) => ({
    logs: state.outputs[ownProps.index].logs
});

export const LogsOutputContainer = connect(mapStateToProps)(LogsOutputComponent);