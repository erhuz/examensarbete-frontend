import { connect } from 'react-redux';
import Token from 'components/Token';
import { SET_ACCESS_TOKEN, REMOVE_ACCESS_TOKEN } from 'actions/auth.actions';

const mapStateToProps = (state) => {
  return {
    data: null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    SET_ACCESS_TOKEN: (token) => {
      dispatch(SET_ACCESS_TOKEN(token));
    },
    REMOVE_ACCESS_TOKEN: () => {
      dispatch(REMOVE_ACCESS_TOKEN());
    }
  }
}

const TokenContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Token)

export default TokenContainer;
