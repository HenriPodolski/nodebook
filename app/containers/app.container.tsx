import { connect } from 'react-redux';
import { AppComponent } from '../components/app.component';
import { initAction } from '../actions/init/init.actions';

const mapStateToProps = state => ({
	loading: state.loading,
	debug: state.debug.components
});

const mapDispatchToProps = (dispatch) => {
	return ({
		init: () => {
			return dispatch(initAction());
		}
	});
};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppComponent);