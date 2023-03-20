// export const loginAction = ({ user, token }) => {
//   return {
//     type: "LOGIN",
//     user,
//     token,
//   };
// };

export const loginAction = (user) => {
  return {
    type: "LOGIN",
    user,
    token: user.tokens[user.tokens.length - 1].token,
  };
};

export const logoutAction = () => {
  return {
    type: "LOGOUT",
  };
};
