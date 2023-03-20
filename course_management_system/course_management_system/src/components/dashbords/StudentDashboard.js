import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { editUserDetail } from "../../api/coursesAndUsersApi";
import { changePassword } from "../../api/editDetailsApi";
import { getUserFromCookie, saveUserCookie } from "../../cookies/cookies";
import Loader from "../main/Loader";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const user = getUserFromCookie();
  const [isClickChangeDetailBtn, setIsClickChangeDetailBtn] = useState({
    isClickChangeName: false,
    isClickChangeBirth: false,
    isClickChangeAddress: false,
    isClickChangeEmail: false,
    isClickChangePassword: false,
  });
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onClickChangeDetail = (detail) => {
    setIsClickChangeDetailBtn({ ...isClickChangeDetailBtn, [detail]: true });
  };

  const onSubmitNewDetail = (event) => {
    let newDetail = event.target.parentNode.children[0].value.trim();
    const fieldToChange = Object.keys(isClickChangeDetailBtn).filter(
      (field) => isClickChangeDetailBtn[field]
    );

    let detailToChange = "";
    switch (fieldToChange[0]) {
      case "isClickChangeName":
        detailToChange = "name";
        break;
      case "isClickChangeBirth":
        detailToChange = "birth";
        break;
      case "isClickChangeAddress":
        detailToChange = "address";
        break;
      case "isClickChangeEmail":
        detailToChange = "email";
        break;

      case "isClickChangePassword":
        detailToChange = "password";
        break;
    }

    editUserDetail(detailToChange, newDetail).then(
      (userDetail) => {
        saveUserCookie(userDetail.user);
        setIsClickChangeDetailBtn({
          ...isClickChangeDetailBtn,
          [fieldToChange[0]]: false,
        });
        setMessage(`${detailToChange} was successfully change `);
        setTimeout(() => {
          setMessage("");
        }, 2000);
      },
      (err) => {
        setErrorMessage("*Invalid input");
        setIsClickChangeDetailBtn({
          ...isClickChangeDetailBtn,
          [fieldToChange[0]]: false,
        });

        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      }
    );
  };

  const onSubmitNewPassword = (event) => {
    const oldPassword =
      event.target.parentNode.children[0].children[0].value.trim();
    const newPassword =
      event.target.parentNode.children[0].children[1].value.trim();

    changePassword(oldPassword, newPassword, user).then(
      (userData) => {
        saveUserCookie(userData.user);
        setIsClickChangeDetailBtn({
          ...isClickChangeDetailBtn,
          ["isClickChangePassword"]: false,
        });
      },
      (err) => {
        setErrorMessage(err.message);
        setIsClickChangeDetailBtn({
          ...isClickChangeDetailBtn,
          ["isClickChangePassword"]: false,
        });
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      }
    );
  };

  const onClickMyCourses = () => {
    navigate("/student-dashboard/my-courses");
  };

  return (
    <div className="dashboard">
      {/* <h2>{!user.token ? user.name : user.user.name} Dashboard</h2> */}
      <h2>{user.name} Dashboard</h2>

      <div>
        {/* <p>Name: {!user.token ? user.name : user.user.name}</p> */}
        <p>Name: {user.name}</p>
        <button
          onClick={() => {
            onClickChangeDetail("isClickChangeName");
          }}
        >
          change
        </button>
      </div>
      {isClickChangeDetailBtn.isClickChangeName && (
        <div>
          <input placeholder="Enter new name" />
          <button onClick={onSubmitNewDetail}>Submit</button>
        </div>
      )}

      <div>
        <p>
          Birth:{" "}
          {/* {!user.token ? user.birth.slice(0, 10) : user.user.birth.slice(0, 10)} */}
          {user.birth.slice(0, 10)}
        </p>
        <button
          onClick={() => {
            onClickChangeDetail("isClickChangeBirth");
          }}
        >
          change
        </button>
      </div>
      {isClickChangeDetailBtn.isClickChangeBirth && (
        <div>
          <input
            placeholder="Enter new birth"
            type="date"
            min="1955-01-01"
            max="2010-12-31"
          />
          <button onClick={onSubmitNewDetail}>Submit</button>
        </div>
      )}

      <div>
        {/* <p>Address: {!user.token ? user.address : user.user.address}</p> */}
        <p>Address: {user.address}</p>
        <button
          onClick={() => {
            onClickChangeDetail("isClickChangeAddress");
          }}
        >
          change
        </button>
      </div>
      {isClickChangeDetailBtn.isClickChangeAddress && (
        <div>
          <input placeholder="Enter new address" />
          <button onClick={onSubmitNewDetail}>Submit</button>
        </div>
      )}

      <div>
        {/* <p>Email: {!user.token ? user.email : user.user.email}</p> */}
        <p>Email: {user.email}</p>
        <button
          onClick={() => {
            onClickChangeDetail("isClickChangeEmail");
          }}
        >
          change
        </button>
      </div>
      {isClickChangeDetailBtn.isClickChangeEmail && (
        <div>
          <input placeholder="Enter new email" />
          <button onClick={onSubmitNewDetail}>Submit</button>
        </div>
      )}

      <div>
        <p>Password: ******</p>
        <button
          onClick={() => {
            onClickChangeDetail("isClickChangePassword");
          }}
        >
          change
        </button>
      </div>
      {isClickChangeDetailBtn.isClickChangePassword && (
        <div className="input-password-container">
          <div>
            <input type="password" placeholder="Enter old password" />
            <input type="password" placeholder="Enter new password" />
          </div>
          <button onClick={onSubmitNewPassword}>Submit</button>
        </div>
      )}
      {message !== "" && <span className="message">{message}</span>}
      {errorMessage !== "" && (
        <span className="error-message">{errorMessage}</span>
      )}
      <div className="buttons-container">
        <button onClick={onClickMyCourses}>My courses</button>
      </div>
    </div>
  );
};
export default StudentDashboard;
