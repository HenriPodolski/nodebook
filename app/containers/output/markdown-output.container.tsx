import { connect } from 'react-redux';
import { MarkdownOutputComponent } from '../../components/output/markdown-output.component';

const mapStateToProps = (state, ownProps) => ({
    value: state.outputs[ownProps.index].value
});

export const MarkdownOutputContainer = connect(mapStateToProps)(MarkdownOutputComponent);