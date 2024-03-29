import { createContext, useReducer } from "react";
import { getUserFromCookie } from "../cookies/cookies";
import loginReducer, { userDataInitState } from "../reducers/loginReducer";

export const loginContext = createContext();

const LoginContextProvider = (props) => {
  // console.log(getUserFromCookie());
  // const [userData, dispatchUserData] = useReducer(
  //   loginReducer,
  //   getUserFromCookie() || userDataInitState
  // );
  const user = getUserFromCookie();
  // console.log(user);
  const [userData, dispatchUserData] = useReducer(
    loginReducer,
    user
      ? { user, token: user.tokens[user.tokens.length - 1] }
      : userDataInitState
  );

  return (
    <loginContext.Provider value={{ userData, dispatchUserData }}>
      {props.children}
    </loginContext.Provider>
  );
};

export default LoginContextProvider;
