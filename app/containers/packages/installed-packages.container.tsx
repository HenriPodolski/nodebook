import { connect } from 'react-redux';
import { InstalledPackagesComponent } from '../../components/packages/installed-packages.component';


const mapStateToProps = state => ({
  dependencies: state.packages.dependencies,
  devDependencies: state.packages.devDependencies
});

const mapDispatchToProps = (dispatch) => {
  return ({

  });
};

export const InstalledPackagesContainer = connect(mapStateToProps, mapDispatchToProps)(InstalledPackagesComponent);