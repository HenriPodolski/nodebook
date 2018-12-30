import { connect } from 'react-redux';
import { DeleteEntryComponent } from '../../components/controls/delete-entry.component';
import { deleteIntentionAction } from '../../actions/controls/delete.actions';

const mapStateToProps = (state, ownProps) => ({
    index: ownProps.index
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        deleteEntry: (state) => {
            return dispatch(deleteIntentionAction(ownProps.index));
        }
    });
};

export const DeleteEntryContainer = connect(mapStateToProps, mapDispatchToProps)(DeleteEntryComponent);