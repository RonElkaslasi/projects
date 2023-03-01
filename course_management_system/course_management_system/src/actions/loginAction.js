export const loginAction = ({ user, token }) => {
  return {
    type: "LOGIN",
    user,
    token,
  };
};

export const logoutAction = () =>{
    return {
        type: "LOGOUT"
    }
}