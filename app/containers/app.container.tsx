import { connect } from 'react-redux';
import { AppComponent } from '../components/app.component';
import { stopAction } from '../actions/loading/loading.actions';

const mapStateToProps = state => ({
	loading: state.loading,
	debug: state.debug.components
});

const mapDispatchToProps = (dispatch, ownProps) => {
	return ({
		stopLoading: (state) => {
			return dispatch(stopAction(state));
		},
	});
};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppComponent);