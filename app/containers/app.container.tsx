import { connect } from 'react-redux';
import { AppComponent } from '../components/app.component';
import { initAction } from '../actions/init/init.actions';
import { cancelEditAction, editAction, updateAction } from '../actions/title/title.actions';

const mapStateToProps = state => ({
	title: state.title,
	loading: state.loading,
	debug: state.debug.components
});

const mapDispatchToProps = (dispatch) => {
	return ({
		init: () => {
			return dispatch(initAction());
		},
		updateTitle: (newTitle) => {
			return dispatch(updateAction(newTitle));
		},
    editTitle: () => {
      return dispatch(editAction());
    },
    cancelEditTitle: () => {
      return dispatch(cancelEditAction());
    }
	});
};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppComponent);