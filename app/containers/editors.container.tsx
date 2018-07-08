import { connect } from 'react-redux';
import { EditorsComponent } from '../components/editors.component';

const mapStateToProps = state => ({
    editors: state.editors,
    debug: state.debug.components
});

export const EditorsContainer = connect(mapStateToProps)(EditorsComponent);