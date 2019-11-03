const initialState = {
  access_token: null,
  user: {
    profile_picture: null,
    id: null,
    name: null,
    email: null,
    roles: null,
    status: null,
  }
}

const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'SET_ACCESS_TOKEN':
      return {
        ...state,
        access_token: action.payload
      }

    case 'REMOVE_ACCESS_TOKEN':
      return {
        ...state,
        access_token: null
      }

    case 'SET_USER_DATA':
      return {
        ...state,
        user: {
          profile_picture: action.payload.profile_picture,
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          roles: action.payload.roles,
          status: action.payload.status,
        }
      }

    case 'REMOVE_USER_DATA':
      return {
        ...state,
        user: {
          profile_picture: null,
          name: null,
          email: null,
          roles: null,
          status: null,
        }
      }

    case 'UPDATE_USER_STATUS':
      return {
        ...state,
        user: {
          ...state.user,
          status: action.payload,
        }
      }

    default:
      return state;
  }
}

export default authReducer;
