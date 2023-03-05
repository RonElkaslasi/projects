import react, { useContext, useState } from "react";
import { loginContext } from "../../context/loginContext";
import Header from "../main/Header";
import { getUserFromCookie } from "../../cookies/cookies";
import { changeDetail, changePassword } from "../../api/editDetailsApi";
import { loginAction } from "../../actions/loginAction";
import { saveUserCookie } from "../../cookies/cookies";
import { useNavigate } from "react-router-dom";

const ProfessorDash = (props) => {
  const navigate = useNavigate();
  const user = getUserFromCookie();
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const [isChangeName, setIsChangeName] = useState(false);
  const [isChangeBirth, setIsChangeBirth] = useState(false);
  const [isChangeAddress, setIsChangeAddress] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);

  const onClickChangeEmail = () => {
    setIsChangeEmail(true);
  };

  const onClickChangeName = () => {
    setIsChangeName(true);
  };

  const onClickChangeBirth = () => {
    setIsChangeBirth(true);
  };

  const onClickChangeAdress = () => {
    setIsChangeAddress(true);
  };

  const onClickChangePassword = () => {
    setIsChangePassword(true);
  };

  const onClickSubmitNewEmail = (event) => {
    const newEmail = event.target.parentNode.children[0].value.trim();

    changeDetail("email", newEmail, user).then((userData) => {
      saveUserCookie(userData);
      setIsChangeEmail(false);
    });
  };

  const onClickSubmitNewName = (event) => {
    const newName = event.target.parentNode.children[0].value.trim();

    changeDetail("name", newName, user).then((userData) => {
      saveUserCookie(userData);
      setIsChangeName(false);
    });
  };

  const onClickSubmitNewBirth = (event) => {
    const newBirth = event.target.parentNode.children[0].value.trim();

    changeDetail("birth", newBirth, user).then((userData) => {
      saveUserCookie(userData);
      setIsChangeBirth(false);
    });
  };

  const onClickSubmitNewPassword = (event) => {
    const currentPassword =
      event.target.parentNode.children[0].children[0].value.trim();

    // console.log(event.target.parentNode.children[0].children[1]);
    const newPassword =
      event.target.parentNode.children[0].children[1].value.trim();
    // console.log(newPassword);
    changePassword(currentPassword, newPassword, user).then((userData) => {
      saveUserCookie(userData);
      setIsChangePassword(false);
    });
  };

  const onClickSubmitNewAddress = (event) => {
    const newAddress = event.target.parentNode.children[0].value.trim();

    changeDetail("address", newAddress, user).then((userData) => {
      saveUserCookie(userData);
      setIsChangeAddress(false);
    });
  };

  const onClickAllCoursesButton = () => {
    navigate("/all-courses");
  };

  return (
    <div className="dashboard">
      <h2>Prof.{!user.token ? user.name : user.user.name} Dashboard</h2>
      <div>
        <p>Name: {!user.token ? user.name : user.user.name}</p>
        <button onClick={onClickChangeName}>Change</button>
      </div>
      {isChangeName && (
        <div>
          <input placeholder="Enter new name" />
          <button onClick={onClickSubmitNewName}>Submit</button>
        </div>
      )}

      <div>
        <p>Email: {!user.token ? user.email : user.user.email}</p>
        <button onClick={onClickChangeEmail}>Change</button>
      </div>
      {isChangeEmail && (
        <div>
          <input placeholder="Enter new Email" />
          <button onClick={onClickSubmitNewEmail}>Submit</button>
        </div>
      )}

      <div>
        <p>Birth: {!user.token ? user.birth : user.user.birth}</p>
        <button onClick={onClickChangeBirth}>Change</button>
      </div>
      {isChangeBirth && (
        <div>
          <input placeholder="Enter new Birth" />
          <button onClick={onClickSubmitNewBirth}>Submit</button>
        </div>
      )}

      <div>
        <p>Address: {!user.token ? user.address : user.user.address}</p>
        <button onClick={onClickChangeAdress}>Change</button>
      </div>
      {isChangeAddress && (
        <div>
          <input placeholder="Enter new address" />
          <button onClick={onClickSubmitNewAddress}>Submit</button>
        </div>
      )}

      <div>
        <p>Password: ********</p>
        <button onClick={onClickChangePassword}>Change</button>
      </div>
      {isChangePassword && (
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
        <button>Add New Student</button>
        <button>Students List</button>
      </div>
    </div>
  );
};

export default ProfessorDash;
