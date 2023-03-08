import react, { useContext, useState } from "react";
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
  const user = getUserFromCookie();
  const [isChangeDetail, setIsChangeDetail] = useState({
    isChangeName: false,
    isChangeBirth: false,
    isChangeAddress: false,
    isChangeEmail: false,
    isChangePassword: false,
  });

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
    let detailToChange = "";
    switch (fieldToChange[0]) {
      case "isChangeName":
        detailToChange = "name";
        break;
      case "isChangeBirth":
        detailToChange = "birth";
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

    editUserDetail(detailToChange, newDetail).then((userDetail) => {
      console.log(userDetail.user);
      saveUserCookie(userDetail.user);
      setIsChangeDetail({ ...isChangeDetail, [fieldToChange[0]]: false });
    });
  };

  const onClickSubmitNewPassword = (event) => {
    const currentPassword =
      event.target.parentNode.children[0].children[0].value.trim();

    const newPassword =
      event.target.parentNode.children[0].children[1].value.trim();

    changePassword(currentPassword, newPassword, user).then((userData) => {
      saveUserCookie(userData);
      setIsChangeDetail({ ...isChangeDetail, ["isChangePassword"]: false });
    });
  };

  const onClickAllCoursesButton = () => {
    navigate("/all-courses");
  };

  const onClickAllStudentBtn = () => {
    navigate("/professor-dashboard/students-list");
  };

  return (
    <div className="dashboard">
      <h2>Prof.{!user.token ? user.name : user.user.name} Dashboard</h2>
      <div>
        <p>Name: {!user.token ? user.name : user.user.name}</p>
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
        <p>Email: {!user.token ? user.email : user.user.email}</p>
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
        <p>Birth: {!user.token ? user.birth : user.user.birth}</p>
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
          <input placeholder="Enter new Birth" />
          <button onClick={onClickSubmitNewDetail}>Submit</button>
        </div>
      )}

      <div>
        <p>Address: {!user.token ? user.address : user.user.address}</p>
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

      <div className="buttons-container">
        <button onClick={onClickAllCoursesButton}>All Courses</button>
        <button onClick={onClickaddNewStudent}>Add New Student</button>
        <button onClick={onClickAllStudentBtn}>All students</button>
      </div>
    </div>
  );
};

export default ProfessorDash;
