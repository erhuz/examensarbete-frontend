import { connect } from 'react-redux';
import EmployeeCallContainer from 'components/EmployeeCallContainer';
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
    SET_CURRENT_CALL: (token) => {
      dispatch(SET_CURRENT_CALL(token));
    },
    UPDATE_CURRENT_CALL: (token) => {
      dispatch(UPDATE_CURRENT_CALL(token));
    },
    REMOVE_CURRENT_CALL: () => {
      dispatch(REMOVE_CURRENT_CALL());
    },
  }
}

const CallContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeeCallContainer)

export default CallContainer;
