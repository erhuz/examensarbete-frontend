export const userHasRole = (roleName, user) => {
  // If role found
  user.roles.forEach(role => {
    if(role.name === roleName){
      return true;
    }
  });

  // If role not found
  return false;
}

export const getUserRoles = (user) => {
  return user.roles.map((role) => {
    return role.name;
  })
}
