import { connect } from 'react-redux';
import { PackagesComponent } from '../components/packages.component';
import {
  cancelConfigureAction,
  configureAction,
  stageDependencyAction, stageDevDependencyAction
} from '../actions/packages/packages.actions';
import { queryAction } from '../actions/packages/packages-autocomplete.actions';

const mapStateToProps = state => ({
  configure: state.packages.configure,
  packagesAutocomplete: state.packagesAutocomplete
});

const mapDispatchToProps = (dispatch) => {
  return ({
    stageDependencyAction: (dependency: string) => {
      return dispatch(stageDependencyAction(dependency));
    },
    stageDevDependencyAction: (dependency: string) => {
      return dispatch(stageDevDependencyAction(dependency));
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