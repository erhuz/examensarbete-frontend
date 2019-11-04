// Store the OAuth api token
export const SET_CURRENT_CALL = (call) => {
  return {
    type: 'SET_CURRENT_CALL',
    payload: call,
  }
};

export const UPDATE_CURRENT_CALL = (call) => {
  return {
    type: 'SET_CURRENT_CALL',
    payload: call,
  }
};

export const REMOVE_CURRENT_CALL = () => {
  return {
    type: 'REMOVE_CURRENT_CALL',
  }
};
