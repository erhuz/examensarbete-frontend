// Store the OAuth api token
export const SET_ACCESS_TOKEN = (token) => {
  return {
    type: 'SET_ACCESS_TOKEN',
    payload: token,
  }
};

// Delete the OAuth api token
export const REMOVE_ACCESS_TOKEN = () => {
  return {
    type: 'REMOVE_ACCESS_TOKEN',
  }
};

// Set the authentants profile image
export const SET_USER_DATA = (user_data) => {
  return {
    type: 'SET_USER_DATA',
    payload: user_data,
  }
};

// Remove the authentants profile image
export const REMOVE_USER_DATA = () => {
  return {
    type: 'REMOVE_USER_DATA',
  }
};

// Update the authentants status
export const UPDATE_USER_STATUS = (user_status) => {
  return {
    type: 'UPDATE_USER_STATUS',
    payload: user_status,
  }
};
