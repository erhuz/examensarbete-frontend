const initialState = {
  access_token: null,
  account_picture: null,
  account_name: null,
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

    case 'SET_ACCOUNT_PICTURE':
      return {
        ...state,
        account_picture: action.payload,
      }
    case 'REMOVE_ACCOUNT_PICTURE':
      return {
        ...state,
        account_picture: null,
      }
    case 'SET_ACCOUNT_NAME':
      return {
        ...state,
        account_name: action.payload,
      }
    case 'REMOVE_ACCOUNT_NAME':
      return {
        ...state,
        account_name: null,
      }

    default:
      // throw new Error('Unknown action: ' + action.type);
      // Potential permanent fix for compiling
      return state;
  }
}

export default authReducer;
