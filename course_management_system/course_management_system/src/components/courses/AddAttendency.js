import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addAttendenc } from "../../api/attendencyApi";
import { getUserFromCookie } from "../../cookies/cookies";
import { convertNumberToDay } from "../../utils/utils";

const AddAttendency = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state.course;
  const user = getUserFromCookie();

  const [isPresened, setIsPresened] = useState(true);
  const [inputReason, setInputReason] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const onClickBackToLessonsCourse = () => {
    navigate("/student-dashboard/my-courses/course-lessons", {
      state: { course },
    });
  };

  const validateForm = () => {
    if (isPresened) return false;
    else if (!isPresened && inputReason !== "") return false;

    return true;
  };

  const onChangePresent = (event) => {
    const present = event.target.value;

    if (present === "yes") setIsPresened(true);
    if (present === "no") setIsPresened(false);
  };

  const onChangeInputReason = (event) => {
    const reason = event.target.value.trim();

    if (reason !== "") setInputReason(reason);
    else setInputReason("");
  };

  const onSubmitAttend = (event) => {
    event.preventDefault();
    console.log(user);
    addAttendenc(
      course,
      user,
      location.state.courseDate,
      isPresened,
      inputReason
    ).then(
      (attend) => {
        console.log(attend);
        setMessage("Presence added successfully!");
        setTimeout(() => {
          setMessage("");
          navigate("/student-dashboard/my-courses/course-lessons", {
            state: { course },
          });
        }, 2000);
      },
      (err) => {
        setErrorMessage(err.message);
      }
    );
  };

  return (
    <div className="add-attendenty-countainer">
      <form className="add-attendenty-form" onSubmit={onSubmitAttend}>
        <h2>Add attendency To {location.state.course.name} class</h2>
        {errorMessage !== "" && (
          <span className="error-message">{errorMessage}</span>
        )}

        {message !== "" && <span className="message">{message}</span>}

        <div>
          Date: <span>{location.state.courseDate}</span>
        </div>
        <div>
          Present:{" "}
          <select onChange={onChangePresent}>
            <option value="yes" name="present">
              Yes
            </option>
            <option value="no" name="present">
              No
            </option>
          </select>
        </div>
        {!isPresened && (
          <input
            placeholder="Enter your reason"
            onChange={onChangeInputReason}
          />
        )}

        <div className="buttons-course-container">
          <button type="submit" disabled={validateForm()}>
            Submit
          </button>
          <button
            className="back-to-courses-lessons-button"
            onClick={onClickBackToLessonsCourse}
          >
            Back to course lessons
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAttendency;
