import React, { useState } from "react";
import LoginStudent from "./LoginStudent";
import LoginProfessor from "./LoginProfessor";
import SubscribeProfessor from "./SubscribeProfessor";
import LoginForm from "./LoginForm";
import { useLocation } from "react-router-dom";

const Login = (props) => {
  // const [isStudentMode, setIsStudentMode] = useState(true);
  // const [isLoginProfessorMode, setIsLoginProfessorMode] = useState(true);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const errorMessage = useLocation().state?.needToLogin
    ? "You must to login!"
    : "";
  return (
    <div className="login">
      <div className="login-page-form">
        {isLoginMode ? (
          <LoginForm
            setIsLoginMode={setIsLoginMode}
            errorMessage={errorMessage}
          />
        ) : (
          <SubscribeProfessor setIsLoginMode={setIsLoginMode} />
        )}
        {/* {isStudentMode ? (
          <LoginStudent
            setIsStudentMode={setIsStudentMode}
            errorMessage={errorMessage}
          />
        ) : isLoginProfessorMode ? (
          <LoginProfessor
            setIsStudentMode={setIsStudentMode}
            setIsLoginProfessorMode={setIsLoginProfessorMode}
            errorMessage={errorMessage}
          />
        ) : (
          <SubscribeProfessor
            setIsLoginProfessorMode={setIsLoginProfessorMode}
          />
        )} */}
      </div>
    </div>
  );
};

export default Login;
