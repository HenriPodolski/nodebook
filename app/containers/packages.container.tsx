import { connect } from 'react-redux';
import { PackagesComponent } from '../components/packages.component';
import { cancelConfigureAction, configureAction } from '../actions/packages/packages.actions';

const mapStateToProps = state => ({
  configure: state.packages.configure
});

const mapDispatchToProps = (dispatch) => {
  return ({
    config: () => {
      return dispatch(configureAction());
    },
    cancelConfig: () => {
      return dispatch(cancelConfigureAction());
    }
  });
};

export const PackagesContainer = connect(mapStateToProps, mapDispatchToProps)(PackagesComponent);