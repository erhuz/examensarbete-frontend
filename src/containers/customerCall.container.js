import { connect } from 'react-redux';
import CustomerCallContainer from 'components/CustomerCallContainer';
import {
  SET_CURRENT_CALL,
  UPDATE_CURRENT_CALL,
  REMOVE_CURRENT_CALL,
} from 'actions/call.actions';

const mapStateToProps = ({callReducer, authReducer}) => {
  return {callReducer, authReducer};
}

const mapDispatchToProps = (dispatch) => {
  return {
    SET_CURRENT_CALL: (call) => {
      dispatch(SET_CURRENT_CALL(call));
    },
    UPDATE_CURRENT_CALL: (call) => {
      dispatch(UPDATE_CURRENT_CALL(call));
    },
    REMOVE_CURRENT_CALL: () => {
      dispatch(REMOVE_CURRENT_CALL());
    },
  }
}

const CallContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerCallContainer)

export default CallContainer;
