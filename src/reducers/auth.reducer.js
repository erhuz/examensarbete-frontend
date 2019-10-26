const initialState = {
  access_token: null,
  user: {
    profile_picture: null,
    name: null,
    email: null,
  }
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

    case 'SET_USER_DATA':
      return {
        ...state,
        user: {
          profile_picture: action.payload.profile_picture,
          name: action.payload.name,
          email: action.payload.email,
        }
      }

    case 'REMOVE_USER_DATA':
      return {
        ...state,
        user: {
          profile_picture: null,
          name: null,
          email: null,
        }
      }

    default:
      // throw new Error('Unknown action: ' + action.type);
      // Potential permanent fix for compiling
      return state;
  }
}

export default authReducer;
