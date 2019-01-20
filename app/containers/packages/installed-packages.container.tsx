import { connect } from 'react-redux';
import { InstalledPackagesComponent } from '../../components/packages/installed-packages.component';
import {removeDependencyAction, removeDevDependencyAction} from "../../actions/packages/packages.actions";


const mapStateToProps = state => ({
  dependencies: state.packages.dependencies,
  devDependencies: state.packages.devDependencies
});

const mapDispatchToProps = (dispatch) => {
  return ({
    removeDependency: (dependency) => {
      return dispatch(removeDependencyAction(dependency));
    },
    removeDevDependency: (devDependency) => {
      return dispatch(removeDevDependencyAction(devDependency));
    }
  });
};

export const InstalledPackagesContainer = connect(mapStateToProps, mapDispatchToProps)(InstalledPackagesComponent);