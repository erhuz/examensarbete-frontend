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
export const SET_ACCOUNT_PICTURE = () =>{
  return {
    type: 'SET_ACCOUNT_PICTURE'
  }
};

// Remove the authentants profile image
export const REMOVE_ACCOUNT_PICTURE = () =>{
  return {
    type: 'REMOVE_ACCOUNT_PICTURE'
  }
};

// Set the authentants profile name
export const SET_ACCOUNT_NAME = () =>{
  return {
    type: 'SET_ACCOUNT_NAME'
  }
};

// Remove the authentants profile name
export const REMOVE_ACCOUNT_NAME = () =>{
  return {
    type: 'REMOVE_ACCOUNT_NAME'
  }
};
