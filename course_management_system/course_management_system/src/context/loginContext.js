import { createContext, useReducer } from "react";
import { getUserFromCookie } from "../cookies/cookies";
import loginReducer, { userDataInitState } from "../reducers/loginReducer";

export const loginContext = createContext();

const LoginContextProvider = (props) => {
  const cookieUserData = getUserFromCookie();
  const [userData, dispatchUserData] = useReducer(
    loginReducer,
    cookieUserData || userDataInitState
  );

  return (
    <loginContext.Provider value={{ userData, dispatchUserData }}>
      {props.children}
    </loginContext.Provider>
  );
};

export default LoginContextProvider;
