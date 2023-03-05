export const loginAction = ({ user, token }) => {
  return {
    type: "LOGIN",
    user,
    token,
  };
};
// export const loginAction = ({ user, token }) => {
//   return {
//     type: "LOGIN",
//     payload: {
//       user,
//       token,
//     },
//     // user,
//     // token,
//   };
// };
export const logoutAction = () => {
  return {
    type: "LOGOUT",
  };
};
