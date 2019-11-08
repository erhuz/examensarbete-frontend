import { connect } from 'react-redux';
import Header from 'partials/Header';
import {
  SET_ACCESS_TOKEN,
  REMOVE_ACCESS_TOKEN,
  SET_USER_DATA,
  REMOVE_USER_DATA,
  UPDATE_USER_STATUS,
} from 'actions/auth.actions';

import {
  SET_CURRENT_CALL,
  UPDATE_CURRENT_CALL,
  REMOVE_CURRENT_CALL,
} from 'actions/call.actions';

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
    },
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

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)

export default HeaderContainer;
