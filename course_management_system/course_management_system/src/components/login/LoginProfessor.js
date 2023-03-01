import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../actions/loginAction";
import { loginProfToSite } from "../../api/loginApi";
import { loginContext } from "../../context/loginContext";
import { saveUserCookie } from "../../cookies/cookies";
import SubscribeProfessor from "./SubscribeProfessor";

const LoginProfessor = (props) => {
  const navigate = useNavigate();
  const { dispatchUserData } = useContext(loginContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailProfessor, setEmailProfessor] = useState("");
  const [passwordProfessor, setPasswordProfessor] = useState("");
  const [isEmailProfInputValid, setIsEmailProfInputValid] = useState(true);
  const [isPasswordProfInputValid, setIsPasswordProfInputValid] =
    useState(true);

  useEffect(() => {
    if (props.errorMessage !== "") setErrorMessage(props.errorMessage);
  }, [props.errorMessage]);

  const onClickStudentLogin = () => {
    props.setIsStudentMode(true);
  };
  const onClickProfessorSubscribe = () => {
    props.setIsLoginProfessorMode(false);
  };

  const isFromInvalid = () => {
    return emailProfessor === "" || passwordProfessor === "";
  };

  const onBlurEmailProfInput = (event) => {
    const emailProf = event.target.value.trim();

    if (emailProf === "") {
      setEmailProfessor("");
      setIsEmailProfInputValid(false);
    } else {
      setEmailProfessor(emailProf);
      setIsEmailProfInputValid(true);
    }
  };

  const onBlurPasswordProfInput = (event) => {
    const passwordProf = event.target.value.trim();

    if (passwordProf === "") {
      setPasswordProfessor("");
      setIsPasswordProfInputValid(false);
    } else {
      setPasswordProfessor(passwordProf);
      setIsPasswordProfInputValid(true);
    }
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    console.log(emailProfessor);
    console.log(passwordProfessor);
    loginProfToSite(emailProfessor, passwordProfessor).then(
      (userData) => {
        dispatchUserData(loginAction(userData));
        saveUserCookie(userData);
        console.log(userData);
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
      <h3>Professor Login</h3>

      {errorMessage !== "" && (
        <div className="error-message">{errorMessage}</div>
      )}

      <form onSubmit={onSubmitForm}>
        <input
          placeholder="Email"
          onBlur={onBlurEmailProfInput}
          className={!isEmailProfInputValid ? "input-invalid" : null}
        />
        {!isEmailProfInputValid && (
          <div className="invalid-message">Email or password incorrect</div>
        )}
        <input
          type="password"
          placeholder="Password"
          onBlur={onBlurPasswordProfInput}
          className={!isPasswordProfInputValid ? "input-invalid" : null}
        />
        {!isPasswordProfInputValid && (
          <div className="invalid-message">Email or password incorrect</div>
        )}
        <div className="login-form-nav">
          <button type="submit" disabled={isFromInvalid()}>
            Submit
          </button>
          <div onClick={onClickStudentLogin}>Student Login</div>
          <div onClick={onClickProfessorSubscribe}>Professor Subscribe</div>
        </div>
      </form>
    </div>
  );
};

export default LoginProfessor;
