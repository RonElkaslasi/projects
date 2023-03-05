// import React, { useContext, useEffect, useState } from "react";
// import { loginStudentToSite } from "../../api/loginApi";
// import { loginContext } from "../../context/loginContext";
// import { loginAction } from "../../actions/loginAction";
// import { saveUserCookie } from "../../cookies/cookies";

// const LoginStudent = (props) => {
//   const [errorMessage, setErrorMessage] = useState("");
//   const [emailStudent, setEmailStudent] = useState("");
//   const [passwordStudent, setPasswordStudent] = useState("");
//   const [isEmailStudentInputValid, setIsEmailStudentInputValid] =
//     useState(true);
//   const [isPasswordStudentInputValid, setIsPasswordStudentInputValid] =
//     useState(true);

//   const { dispatchUserData } = useContext(loginContext);

//   useEffect(() => {
//     if (props.errorMessage !== "") setErrorMessage(props.errorMessage);
//   }, [props.errorMessage]);

//   const onClickProfessorLogin = () => {
//     props.setIsStudentMode(false);
//   };

//   const isFromInvalid = () => {
//     return emailStudent === "" || passwordStudent === "";
//   };

//   const onBlurEmailStudentInput = (event) => {
//     const emailStudent = event.target.value.trim();

//     if (emailStudent === "") {
//       setEmailStudent("");
//       setIsEmailStudentInputValid(false);
//     } else {
//       setEmailStudent(emailStudent);
//       setIsEmailStudentInputValid(true);
//     }
//   };

//   const onBlurPasswordStudentInput = (event) => {
//     const passwordStudent = event.target.value.trim();

//     if (passwordStudent === "") {
//       setPasswordStudent("");
//       setIsPasswordStudentInputValid(false);
//     } else {
//       setPasswordStudent(passwordStudent);
//       setIsPasswordStudentInputValid(true);
//     }
//   };

//   const onSubmitForm = (event) => {
//     event.preventDefault();
//     console.log(emailStudent);
//     console.log(passwordStudent);
//     loginStudentToSite(emailStudent, passwordStudent).then(
//       (userData) => {
//         dispatchUserData(loginAction(userData));
//         saveUserCookie(userData);
//         console.log(userData);
//       },
//       (err) => {
//         if (err.message === "Email or password are invalid.") {
//           setErrorMessage(err.message);
//         }
//       }
//     );
//   };

//   return (
//     <div className="login-form">
//       <h3>Student Login</h3>

//       {errorMessage !== "" && (
//         <div className="error-message">{errorMessage}</div>
//       )}

//       <form onSubmit={onSubmitForm}>
//         <input
//           placeholder="Email"
//           onBlur={onBlurEmailStudentInput}
//           className={!isEmailStudentInputValid ? "input-invalid" : null}
//         />
//         {!isEmailStudentInputValid && (
//           <div className="invalid-message">Email or password incorrect</div>
//         )}
//         <input
//           type="password"
//           placeholder="Password"
//           onBlur={onBlurPasswordStudentInput}
//           className={!isPasswordStudentInputValid ? "input-invalid" : null}
//         />
//         {!isPasswordStudentInputValid && (
//           <div className="invalid-message">Email or password incorrect</div>
//         )}
//         <div className="login-form-nav">
//           <button type="submit" disabled={isFromInvalid()}>
//             Submit
//           </button>
//           <div onClick={onClickProfessorLogin}>Professor Login</div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginStudent;
