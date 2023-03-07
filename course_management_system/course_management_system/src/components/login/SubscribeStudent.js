import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewStudent } from "../../api/coursesAndUsersApi";

const SubscribeStudent = () => {
  const navigate = useNavigate();
  const [inputDetail, setInputDetail] = useState({
    name: "",
    birth: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [isInputValid, setIsInputValid] = useState({
    isInputnameValid: true,
    isInputbirthValid: true,
    isInputaddressValid: true,
    isInputemailValid: true,
    isInputpasswordValid: true,
    isInputconfirmPasswordValid: true,
  });

  const [isError, setIsError] = useState({
    isPasswordsMatch: true,
    isEmailExist: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const isFromInvalid = () => {
    console.log(inputDetail.role);
    return (
      inputDetail.name === "" ||
      inputDetail.birth === "" ||
      inputDetail.address === "" ||
      inputDetail.email === "" ||
      inputDetail.password === "" ||
      inputDetail.confirmPassword === "" ||
      inputDetail.role === "" ||
      inputDetail.role === "Role"
    );
  };

  const onChangeInputDetail = (event) => {
    setIsError({ ["isPasswordsMatch"]: true, ["isEmailExist"]: false });
    const { name, value } = event.target;

    if (value === "")
      setIsInputValid({
        ...isInputValid,
        ["isInput" + name + "Valid"]: false,
      });
    else
      setIsInputValid({
        ...isInputValid,
        ["isInput" + name + "Valid"]: true,
      });

    setInputDetail({ ...inputDetail, [name]: value });
  };

  const onSubmitNewStudent = (event) => {
    event.preventDefault();
    if (inputDetail.password === inputDetail.confirmPassword) {
      addNewStudent(inputDetail).then((student) => {
        if (student === undefined) {
          setIsError({ ...isError, ["isEmailExist"]: true });
          setErrorMessage("Email or password are invalid");
          return;
        }

        navigate("/professor-dashboard");
      });
    } else {
      setIsError({ ...isError, ["isPasswordsMatch"]: false });
      setErrorMessage("Email or password are invalid");
    }
  };

  return (
    <div className="subscribe-student-page">
      <div className="subscribe-student-container">
        <div className="subscribe-student-form">
          <h3>Subscribe Student</h3>
          {(!isError.isPasswordsMatch || isError.isEmailExist) && (
            <div className="error-message">{errorMessage}</div>
          )}
          <form onSubmit={onSubmitNewStudent}>
            <input
              placeholder="Student name"
              name="name"
              value={inputDetail.name}
              className={
                !isInputValid.isInputnameValid ? "input-invalid" : null
              }
              onChange={onChangeInputDetail}
            />
            <input
              placeholder="Student Birth of date"
              name="birth"
              value={inputDetail.birth}
              className={
                !isInputValid.isInputbirthValid ? "input-invalid" : null
              }
              onChange={onChangeInputDetail}
            />
            <input
              placeholder="Student address"
              name="address"
              value={inputDetail.address}
              className={
                !isInputValid.isInputaddressValid ? "input-invalid" : null
              }
              onChange={onChangeInputDetail}
            />
            <input
              placeholder="Student email"
              name="email"
              value={inputDetail.email}
              className={
                !isInputValid.isInputemailValid ? "input-invalid" : null
              }
              onChange={onChangeInputDetail}
            />
            <input
              type="password"
              placeholder="Enter new password"
              name="password"
              value={inputDetail.password}
              className={
                !isInputValid.isInputpasswordValid ? "input-invalid" : null
              }
              onChange={onChangeInputDetail}
            />
            <input
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              value={inputDetail.confirmPassword}
              className={
                !isInputValid.isInputconfirmPasswordValid
                  ? "input-invalid"
                  : null
              }
              onChange={onChangeInputDetail}
            />
            <select
              name="role"
              value={inputDetail.role}
              onChange={onChangeInputDetail}
            >
              <option>Role</option>
              <option value="student">Student</option>
            </select>
            <button type="submit" disabled={isFromInvalid()}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscribeStudent;
