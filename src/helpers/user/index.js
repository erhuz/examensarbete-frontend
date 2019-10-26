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
