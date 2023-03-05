import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../actions/loginAction";
import { loginToSite } from "../../api/loginApi";
import { loginContext } from "../../context/loginContext";
import { saveUserCookie } from "../../cookies/cookies";
import SubscribeProfessor from "./SubscribeProfessor";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const { dispatchUserData } = useContext(loginContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailInputValid, setIsEmailInputValid] = useState(true);
  const [isPasswordInputValid, setIsPasswordInputValid] = useState(true);

  useEffect(() => {
    if (props.errorMessage !== "") setErrorMessage(props.errorMessage);
  }, [props.errorMessage]);

  const onClickProfessorSubscribe = () => {
    props.setIsLoginMode(false);
  };

  const isFromInvalid = () => {
    return email === "" || password === "";
  };

  const onBlurEmailInput = (event) => {
    const email = event.target.value.trim();

    if (email === "") {
      setEmail("");
      setIsEmailInputValid(false);
    } else {
      setEmail(email);
      setIsEmailInputValid(true);
    }
  };

  const onBlurPasswordInput = (event) => {
    const password = event.target.value.trim();

    if (password === "") {
      setPassword("");
      setIsPasswordInputValid(false);
    } else {
      setPassword(password);
      setIsPasswordInputValid(true);
    }
  };

  const onSubmitForm = (event) => {
    event.preventDefault();

    loginToSite(email, password).then(
      (userData) => {
        // dispatchUserData(loginAction(userData));
        dispatchUserData(loginAction(userData));
        saveUserCookie(userData);
        console.log(userData);

        // console.log(userData);
      },

      (err) => {
        if (err.message === "Email or password are invalid.") {
          setErrorMessage(err.message);
        }
      }
    );
  };

  return (
    <div className="login-form">
      <h3>Login</h3>

      {errorMessage !== "" && (
        <div className="error-message">{errorMessage}</div>
      )}

      <form onSubmit={onSubmitForm}>
        <input
          placeholder="Email"
          onBlur={onBlurEmailInput}
          className={!isEmailInputValid ? "input-invalid" : null}
        />
        {!isEmailInputValid && (
          <div className="invalid-message">Email or password incorrect</div>
        )}
        <input
          type="password"
          placeholder="Password"
          onBlur={onBlurPasswordInput}
          className={!isPasswordInputValid ? "input-invalid" : null}
        />
        {!isPasswordInputValid && (
          <div className="invalid-message">Email or password incorrect</div>
        )}
        <div className="login-form-nav">
          <button type="submit" disabled={isFromInvalid()}>
            Submit
          </button>
          <div onClick={onClickProfessorSubscribe}>Professors Signup</div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
