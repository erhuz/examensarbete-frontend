const initialState = {
  call: null
}

const callReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'SET_CURRENT_CALL':
      return {
        call: action.payload
      }

    case 'UPDATE_CURRENT_CALL':
      return {
        call: action.payload
      }

    case 'REMOVE_CURRENT_CALL':
      return {
        call: null
      }

    default:
      return state;
  }
}

export default callReducer;
