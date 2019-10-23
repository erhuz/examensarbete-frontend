import { connect } from 'react-redux';
import Header from 'partials/Header';
import {
  SET_ACCESS_TOKEN,
  REMOVE_ACCESS_TOKEN,
  SET_ACCOUNT_DATA,
  REMOVE_ACCOUNT_DATA
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
    SET_ACCOUNT_DATA: (account_data) => {
      dispatch(SET_ACCOUNT_DATA(account_data));
    },
    REMOVE_ACCOUNT_DATA: () => {
      dispatch(REMOVE_ACCOUNT_DATA());
    }
  }
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)

export default HeaderContainer;
