import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { MessagesComponent } from './messages.component';
import { submitNewPost, updateGroupsDisplay, updateMsgBoard, updateNewPost, clearMessageBar } from '../../actions/messages/messages.actions';

const mapStateToProps = (state: IState) => (state.messages);

export const mapDispatchToProps = {
  clearMessageBar,
  submitNewPost,
  updateGroupsDisplay,
  updateMsgBoard,
  updateNewPost,
};

export const MessagesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessagesComponent);
