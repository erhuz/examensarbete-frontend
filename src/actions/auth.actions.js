// Store the OAuth api token
export const SET_ACCESS_TOKEN = (token) => {
  return {
    type: 'SET_ACCESS_TOKEN',
    payload: token
  }
};

// Delete the OAuth api token
export const REMOVE_ACCESS_TOKEN = () =>{
  return {
    type: 'REMOVE_ACCESS_TOKEN'
  }
};

// Set the authentants profile image
export const SET_ACCOUNT_DATA = (account_data) =>{
  return {
    type: 'SET_ACCOUNT_DATA',
    payload: account_data
  }
};

// Remove the authentants profile image
export const REMOVE_ACCOUNT_DATA = () =>{
  return {
    type: 'REMOVE_ACCOUNT_DATA'
  }
};
