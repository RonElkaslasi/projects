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
  const [detail, setDetail] = useState({
    email: "",
    password: "",
  });
  const [isDetailInputValid, setIsDetailInputValid] = useState({
    isemailInputValid: true,
    ispasswordInputValid: true,
  });

  useEffect(() => {
    if (props.errorMessage !== "") setErrorMessage(props.errorMessage);
  }, [props.errorMessage]);

  const onClickProfessorSubscribe = () => {
    props.setIsLoginMode(false);
    navigate("/login/subscribe-professor");
  };

  const isFromInvalid = () => {
    return detail.email === "" || detail.password === "";
  };

  const onChangeDetail = (event) => {
    setErrorMessage("");
    const { name, value } = event.target;
    if (value === "") {
      setIsDetailInputValid({
        ...isDetailInputValid,
        [`is${name}InputValid`]: false,
      });
    } else {
      setIsDetailInputValid({
        ...isDetailInputValid,
        [`is${name}InputValid`]: true,
      });
    }
    setDetail({ ...detail, [name]: value });
  };

  const onSubmitForm = (event) => {
    event.preventDefault();

    loginToSite(detail.email, detail.password).then(
      (userData) => {
        dispatchUserData(loginAction(userData));
        saveUserCookie(userData);
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
          name="email"
          value={detail.email}
          onChange={onChangeDetail}
          className={
            !isDetailInputValid.isemailInputValid ? "input-invalid" : null
          }
        />
        {!isDetailInputValid.isemailInputValid && (
          <div className="invalid-message">Email or password incorrect</div>
        )}

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={detail.password}
          onChange={onChangeDetail}
          className={
            !isDetailInputValid.ispasswordInputValid ? "input-invalid" : null
          }
        />
        {!isDetailInputValid.ispasswordInputValid && (
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
