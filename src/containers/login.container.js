import { connect } from 'react-redux';
import LoginForm from 'components/LoginForm';
import {
  SET_ACCESS_TOKEN,
  REMOVE_ACCESS_TOKEN,
  SET_USER_DATA,
  REMOVE_USER_DATA,
  UPDATE_USER_STATUS,
} from 'actions/auth.actions';

const mapStateToProps = ({authReducer}) => {
  return authReducer;
}

const mapDispatchToProps = (dispatch) => {
  return {
    SET_ACCESS_TOKEN: (token) => {
      dispatch(SET_ACCESS_TOKEN(token));
    },
    REMOVE_ACCESS_TOKEN: () => {
      dispatch(REMOVE_ACCESS_TOKEN());
    },
    SET_USER_DATA: (user_data) => {
      dispatch(SET_USER_DATA(user_data));
    },
    REMOVE_USER_DATA: () => {
      dispatch(REMOVE_USER_DATA());
    },
    UPDATE_USER_STATUS: (user_status) => {
      dispatch(UPDATE_USER_STATUS(user_status));
    }
  }
}

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm)

export default LoginFormContainer;
