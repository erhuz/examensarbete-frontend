const initialState = {
  call: null
}

const callReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'SET_CURRENT_CALL':
      return {
        ...state,
        call: action.payload
      }

    case 'UPDATE_CURRENT_CALL':
      return {
        ...state,
        call: action.payload
      }

    case 'REMOVE_CURRENT_CALL':
      return {
        ...state,
        call: null
      }

    default:
      return state;
  }
}

export default callReducer;
