import { createContext, useReducer } from "react";
import editReducer from "../reducers/editReducer";


export const editContext = createContext();

const editContextProvider = (props) =>{
    
    const [userData, dispatchUserData] = useReducer(editReducer, )
}