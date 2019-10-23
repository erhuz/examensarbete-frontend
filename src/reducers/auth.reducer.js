const initialState = {
  access_token: null,
  account_picture: null,
  account_name: null,
  account_email: null,
}

const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'SET_ACCESS_TOKEN':
      return {
        ...state,
        access_token: action.payload
      };

    case 'REMOVE_ACCESS_TOKEN':
      return {
        ...state,
        access_token: null
      };

    case 'SET_ACCOUNT_DATA':
      return {
        ...state,
        account_picture: action.payload.account_picture,
        account_name: action.payload.account_name,
        account_email: action.payload.account_email,
      }

    case 'REMOVE_ACCOUNT_DATA':
      return {
        ...state,
        account_picture: null,
        account_name: null,
        account_email: null,
      }

    default:
      // throw new Error('Unknown action: ' + action.type);
      // Potential permanent fix for compiling
      return state;
  }
}

export default authReducer;
