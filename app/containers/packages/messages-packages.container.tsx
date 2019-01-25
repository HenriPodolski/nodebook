import { connect } from 'react-redux';
import { MessagesPackagesComponent } from '../../components/packages/messages-packages.component';


const mapStateToProps = state => ({
  messages: state.packages.messages
});

const mapDispatchToProps = (dispatch) => {
  return ({

  });
};

export const MessagesPackagesContainer = connect(mapStateToProps, mapDispatchToProps)(MessagesPackagesComponent);