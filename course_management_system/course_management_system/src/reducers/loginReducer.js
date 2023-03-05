export const userDataInitState = { user: null, token: "" };

// const loginReducer = (userData, action) => {
const loginReducer = (userData, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log(action);
      console.log(userData);
      return { user: { ...action.user }, token: action.token };

    case "LOGOUT":
      return { user: null, token: "" };

    default:
      return userData;
  }
};

export default loginReducer;
