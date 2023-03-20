import React, { useState } from "react";
import SubscribeProfessor from "./SubscribeProfessor";
import LoginForm from "./LoginForm";
import { useLocation } from "react-router-dom";

const Login = (props) => {
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
      </div>
    </div>
  );
};

export default Login;
