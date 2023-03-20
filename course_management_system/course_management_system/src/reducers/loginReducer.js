export const userDataInitState = { user: null, token: "" };

const loginReducer = (userData, action) => {
  // console.log(action);
  switch (action.type) {
    case "LOGIN":
      // return { user: { ...action.user }, token: action.token };
      return {
        user: { ...action.user },
        token: action.token.token,
      };

    case "LOGOUT":
      return { user: null, token: "" };

    default:
      return userData;
  }
};

export default loginReducer;
