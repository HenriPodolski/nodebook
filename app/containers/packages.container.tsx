import { connect } from 'react-redux';
import { PackagesComponent } from '../components/packages.component';
import { addDependencyAction, cancelConfigureAction, configureAction } from '../actions/packages/packages.actions';
import { queryAction } from '../actions/packages/packages-autocomplete.actions';

const mapStateToProps = state => ({
  configure: state.packages.configure,
  packagesAutocomplete: state.packagesAutocomplete
});

const mapDispatchToProps = (dispatch) => {
  return ({
    addDependency: (dependency: string) => {
      return dispatch(addDependencyAction(dependency));
    },
    config: () => {
      return dispatch(configureAction());
    },
    cancelConfig: () => {
      return dispatch(cancelConfigureAction());
    },
    query: (query) => {
      return dispatch(queryAction(query))
    }
  });
};

export const PackagesContainer = connect(mapStateToProps, mapDispatchToProps)(PackagesComponent);