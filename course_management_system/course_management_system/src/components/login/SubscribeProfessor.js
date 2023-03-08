import React, { useContext, useState } from "react";
import { loginAction } from "../../actions/loginAction";
import { loginContext } from "../../context/loginContext";
import { saveUserCookie } from "../../cookies/cookies";
import { subscireProfToSite } from "../../api/loginApi";
import { useNavigate } from "react-router-dom";

const SubscribeProfessor = (props) => {
  const navigate = useNavigate();
  const { dispatchUserData } = useContext(loginContext);
  const [professorDetails, setProfessorDetails] = useState({
    name: "",
    email: "",
    birth: "",
    address: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const [isDetailInputValid, setIsDetailInputValid] = useState({
    ispasswordInputValid: true,
    isconfirmPasswordInputValid: true,
    isnameInputValid: true,
    isbirthInputValid: true,
    isaddressInputValid: true,
    isemailInputValid: true,
  });

  const onClickLoginProfessor = () => {
    navigate("/login");
  };

  const isFromInvalid = () => {
    return (
      professorDetails.name === "" ||
      professorDetails.email === "" ||
      professorDetails.password === "" ||
      professorDetails.confirmPassword === "" ||
      professorDetails.birth === "" ||
      professorDetails.address === "" ||
      professorDetails.role === "Role" ||
      professorDetails.role === ""
    );
  };
  const onChangeProfessorInputDetail = (event) => {
    const { name, value } = event.target;

    if (value === "") {
      setIsDetailInputValid({
        ...isDetailInputValid,
        [`is${name}InputValid`]: false,
      });
    } else if (name === "confirmPassword") {
      const password = professorDetails.password;
      const confirmPassword = event.target.value.trim();

      if (confirmPassword === "" || confirmPassword !== password) {
        setIsDetailInputValid({
          ...isDetailInputValid,
          ["confirmPassword"]: false,
        });
      } else {
        setIsDetailInputValid({
          ...isDetailInputValid,
          ["confirmPassword"]: true,
        });
      }
    } else {
      setIsDetailInputValid({
        ...isDetailInputValid,
        [`is${name}InputValid`]: true,
      });
    }
    setProfessorDetails({
      ...professorDetails,
      [name]: value.trim(),
    });
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    subscireProfToSite(professorDetails).then((userData) => {
      saveUserCookie(userData);
      dispatchUserData(loginAction(userData));
    });
  };

  return (
    <div className="subscribe-student-page">
      <div className="subscribe-student-container">
        <div className="subscribe-student-form">
          <h3>Subscribe Professor</h3>
          <form onSubmit={onSubmitForm}>
            <input
              placeholder="Name"
              name="name"
              value={professorDetails.name}
              onChange={onChangeProfessorInputDetail}
              className={
                !isDetailInputValid.isnameInputValid ? "input-invalid" : null
              }
            />
            {!isDetailInputValid.isnameInputValid && (
              <div className="invalid-message">Invalid name</div>
            )}

            <input
              placeholder="Birth"
              name="birth"
              value={professorDetails.birth}
              className={
                !isDetailInputValid.isbirthInputValid ? "input-invalid" : null
              }
              onChange={onChangeProfessorInputDetail}
            />
            {!isDetailInputValid.isbirthInputValid && (
              <div className="invalid-message">Invalid birth</div>
            )}

            <input
              placeholder="Address"
              name="address"
              value={professorDetails.address}
              className={
                !isDetailInputValid.isaddressInputValid ? "input-invalid" : null
              }
              onChange={onChangeProfessorInputDetail}
            />
            {!isDetailInputValid.isaddressInputValid && (
              <div className="invalid-message">Invalid address</div>
            )}

            <input
              placeholder="Email"
              name="email"
              value={professorDetails.email}
              onChange={onChangeProfessorInputDetail}
              className={
                !isDetailInputValid.isemailInputValid ? "input-invalid" : null
              }
            />
            {!isDetailInputValid.isemailInputValid && (
              <div className="invalid-message">Invalid email</div>
            )}
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={professorDetails.password}
              onChange={onChangeProfessorInputDetail}
              className={
                !isDetailInputValid.ispasswordInputValid
                  ? "input-invalid"
                  : null
              }
            />
            {!isDetailInputValid.ispasswordInputValid && (
              <div className="invalid-message">Invalid password</div>
            )}
            <input
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              value={professorDetails.confirmPassword}
              onChange={onChangeProfessorInputDetail}
              className={
                !isDetailInputValid.isconfirmPasswordInputValid
                  ? "input-invalid"
                  : null
              }
            />
            {!isDetailInputValid.isconfirmPasswordInputValid && (
              <div className="invalid-message">Invalid password</div>
            )}
            <select
              name="role"
              value={professorDetails.role}
              onChange={onChangeProfessorInputDetail}
            >
              <option>Role</option>
              <option value="Professor">Professor</option>
            </select>

            <div className="login-form-nav">
              <button type="submit" disabled={isFromInvalid()}>
                Submit
              </button>
              <div onClick={onClickLoginProfessor}>Login</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscribeProfessor;
