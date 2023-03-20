import react, { useContext, useEffect, useState } from "react";
import { loginContext } from "../../context/loginContext";
import Header from "../main/Header";
import { getUserFromCookie, saveCourseCookie } from "../../cookies/cookies";
import { changeDetail, changePassword } from "../../api/editDetailsApi";
import { loginAction } from "../../actions/loginAction";
import { saveUserCookie } from "../../cookies/cookies";
import { useNavigate } from "react-router-dom";
import { editUserDetail } from "../../api/coursesAndUsersApi";

const ProfessorDash = (props) => {
  const navigate = useNavigate();
  // const { userData, dispatchUserData } = useContext(loginContext);
  const user = getUserFromCookie();
  // console.log(user);
  const [isChangeDetail, setIsChangeDetail] = useState({
    isChangeName: false,
    isChangeBirth: false,
    isChangeAddress: false,
    isChangeEmail: false,
    isChangePassword: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const onClickChangeDetail = (detail) => {
    setIsChangeDetail({ ...isChangeDetail, [detail]: true });
  };

  const onClickaddNewStudent = () => {
    navigate("/professor-dashboard/add-new-student");
  };

  const onClickSubmitNewDetail = (event) => {
    let newDetail = event.target.parentNode.children[0].value.trim();
    const fieldToChange = Object.keys(isChangeDetail).filter(
      (field) => isChangeDetail[field]
    );

    // if (fieldToChange[0] === "isChangeBirth") {
    //   newDetail = event.target.parentNode.children[0].valueAsDate;
    // }
    let detailToChange = "";
    switch (fieldToChange[0]) {
      case "isChangeName":
        detailToChange = "name";
        break;
      case "isChangeBirth":
        detailToChange = "birth";
        // newDetail = newDetail.toLocalDateString("en-CA");
        break;
      case "isChangeAddress":
        detailToChange = "address";
        break;
      case "isChangeEmail":
        detailToChange = "email";
        break;

      case "isChangePassword":
        detailToChange = "password";
        break;
    }

    editUserDetail(detailToChange, newDetail).then(
      (userDetail) => {
        console.log(userDetail.user);
        // saveUserCookie(userDetail.user);
        saveUserCookie(userDetail.user);
        setIsChangeDetail({ ...isChangeDetail, [fieldToChange[0]]: false });
      },
      (err) => {
        setErrorMessage("*Invalid input");
        setIsChangeDetail({ ...isChangeDetail, [fieldToChange[0]]: false });
        // saveUserCookie(user);

        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      }
    );
  };

  const onClickSubmitNewPassword = (event) => {
    const currentPassword =
      event.target.parentNode.children[0].children[0].value.trim();

    const newPassword =
      event.target.parentNode.children[0].children[1].value.trim();
    console.log(currentPassword);
    console.log(newPassword);
    console.log(user);
    changePassword(currentPassword, newPassword, user).then(
      (userData) => {
        console.log(userData.user);
        saveUserCookie(userData.user);
        setIsChangeDetail({ ...isChangeDetail, ["isChangePassword"]: false });
      },
      (err) => {
        setErrorMessage(err.message);
        setIsChangeDetail({ ...isChangeDetail, ["isChangePassword"]: false });
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      }
    );
  };

  const onClickAllCoursesButton = () => {
    navigate("/all-courses");
  };

  const onClickAllStudentBtn = () => {
    navigate("/professor-dashboard/students-list");
  };

  // useEffect(() => {
  //   console.log(user.user.birth);
  // }, []);

  return (
    <div className="dashboard">
      {/* <h2>Prof.{!user.token ? user.name : user.user.name} Dashboard</h2> */}
      <h2>Prof.{user.name} Dashboard</h2>
      <div>
        {/* <p>Name: {!user.token ? user.name : user.user.name}</p> */}
        <p>Name: {user.name}</p>
        <button
          onClick={() => {
            onClickChangeDetail("isChangeName");
          }}
        >
          Change
        </button>
      </div>
      {isChangeDetail.isChangeName && (
        <div>
          <input placeholder="Enter new name" />

          <button onClick={onClickSubmitNewDetail}>Submit</button>
        </div>
      )}

      <div>
        {/* <p>Email: {!user.token ? user.email : user.user.email}</p> */}
        <p>Email: {user.email}</p>
        <button
          onClick={() => {
            onClickChangeDetail("isChangeEmail");
          }}
        >
          Change
        </button>
      </div>
      {isChangeDetail.isChangeEmail && (
        <div>
          <input placeholder="Enter new Email" />
          <button onClick={onClickSubmitNewDetail}>Submit</button>
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
            onClickChangeDetail("isChangeBirth");
          }}
        >
          Change
        </button>
      </div>
      {isChangeDetail.isChangeBirth && (
        <div>
          <input
            placeholder="Enter new Birth"
            type="date"
            min="1955-01-01"
            max="2010-12-31"
          />
          <button onClick={onClickSubmitNewDetail}>Submit</button>
        </div>
      )}

      <div>
        {/* <p>Address: {!user.token ? user.address : user.user.address}</p> */}
        <p>Address: {user.address}</p>
        <button
          onClick={() => {
            onClickChangeDetail("isChangeAddress");
          }}
        >
          Change
        </button>
      </div>
      {isChangeDetail.isChangeAddress && (
        <div>
          <input placeholder="Enter new address" />
          <button onClick={onClickSubmitNewDetail}>Submit</button>
        </div>
      )}

      <div>
        <p>Password: ********</p>
        <button
          onClick={() => {
            onClickChangeDetail("isChangePassword");
          }}
        >
          Change
        </button>
      </div>
      {isChangeDetail.isChangePassword && (
        <div>
          <div className="input-password-container">
            <input placeholder="Enter current password" />
            <input placeholder="Enter new password" />
          </div>
          <button onClick={onClickSubmitNewPassword}>Submit</button>
        </div>
      )}
      {errorMessage !== "" && (
        <span className="error-message">{errorMessage}</span>
      )}

      <div className="buttons-container">
        <button onClick={onClickAllCoursesButton}>All Courses</button>
        <button onClick={onClickaddNewStudent}>Add New Student</button>
        <button onClick={onClickAllStudentBtn}>All students</button>
      </div>
    </div>
  );
};

export default ProfessorDash;
