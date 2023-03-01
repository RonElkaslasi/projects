import React, { useState } from "react";

const SubscribeProfessor = (props) => {
  const [professorName, setProfessorName] = useState("");
  const [professorEmail, setProfessorEmail] = useState("");
  const [professorPassword, setProfessorPassword] = useState("");
  const [professorPasswordConfirm, setProfessorPasswordConfirm] = useState("");

  const [isEmailProfInputValid, setIsEmailProfInputValid] = useState(true);
  const [isNameProfInputValid, setIsNameProfInputValid] = useState(true);
  const [isPasswordProfInputValid, setIsPasswordProfInputValid] =
    useState(true);
  const [isPasswordConfirmProfInputValid, setIsPasswordConfirmProfInputValid] =
    useState(true);

  const onClickLoginProfessor = () => {
    props.setIsLoginProfessorMode(true);
  };

  const isFromInvalid = () => {
    return (
      professorName === "" ||
      professorEmail === "" ||
      professorPassword === "" ||
      professorPasswordConfirm === ""
    );
  };

  const onBlurProfInputName = (event) => {
    const profName = event.target.value.trim();

    if (profName === "" || profName.length < 2) {
      setProfessorName("");
      setIsNameProfInputValid(false);
    } else {
      setProfessorName(profName);
      setIsNameProfInputValid(true);
    }
  };

  const onBlurProfInputEmail = (event) => {
    const profEmail = event.target.value.trim();

    if (profEmail === "") {
      setProfessorEmail("");
      setIsEmailProfInputValid(false);
    } else {
      setProfessorEmail(profEmail);
      setIsEmailProfInputValid(true);
    }
  };

  const onBlurProfInputPassword = (event) => {
    const profPassword = event.target.value.trim();

    if (profPassword === "") {
      setProfessorPassword("");
      setIsPasswordProfInputValid(false);
    } else {
      setProfessorPassword(profPassword);
      setIsPasswordProfInputValid(true);
    }
  };
  const onBlurProfInputPasswordConfirm = (event) => {
    const profPasswordConfirm = event.target.value.trim();
    const originPassword = event.target.parentNode.children[3].value.trim();

    if (profPasswordConfirm === "" || profPasswordConfirm !== originPassword) {
      setProfessorPasswordConfirm("");
      setIsPasswordConfirmProfInputValid(false);
    } else {
      setProfessorPasswordConfirm(profPasswordConfirm);
      setIsPasswordConfirmProfInputValid(true);
    }
  };

  return (
    <div className="subscribe-professor">
      <h3>Subscribe Professor</h3>
      <form>
        <input
          placeholder="Name"
          onBlur={onBlurProfInputName}
          className={!isNameProfInputValid ? "input-invalid" : null}
        />
        {!isNameProfInputValid && (
          <div className="invalid-message">Invalid name</div>
        )}
        <input
          placeholder="Email"
          onBlur={onBlurProfInputEmail}
          className={!isEmailProfInputValid ? "input-invalid" : null}
        />
        {!isEmailProfInputValid && (
          <div className="invalid-message">Invalid email</div>
        )}
        <input
          type="password"
          placeholder="Password"
          onBlur={onBlurProfInputPassword}
          className={!isPasswordProfInputValid ? "input-invalid" : null}
        />
        {!isPasswordProfInputValid && (
          <div className="invalid-message">Invalid password</div>
        )}
        <input
          type="password"
          placeholder="Confirm password"
          onBlur={onBlurProfInputPasswordConfirm}
          className={!isPasswordConfirmProfInputValid ? "input-invalid" : null}
        />
        {!isPasswordConfirmProfInputValid && (
          <div className="invalid-message">Invalid password</div>
        )}
        <div className="login-form-nav">
          <button type="submit" disabled={isFromInvalid()}>
            Submit
          </button>
          <div onClick={onClickLoginProfessor}>Login Professor</div>
        </div>
      </form>
    </div>
  );
};

export default SubscribeProfessor;
