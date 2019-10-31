export const userHasRole = (user, roleName) => {
  const roles = getUserRoles(user);

  if(roles.includes(roleName)){
    return true;
  }else{
    return false;
  }
}

export const getUserRoles = (user) => {
  return user.roles.map((role) => {
    return role.name;
  })
}
