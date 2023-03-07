import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  editCourseDetails,
  findUser,
  getUserDetail,
  registerUserToCourse,
  deleteUserFromCourse,
} from "../../api/coursesAndUsersApi";
import {
  deleteCourseFromCookie,
  getCourseFromCookie,
  saveCourseCookie,
} from "../../cookies/cookies";
import { convertNumberToDay } from "../../utils/utils";

const EditCourse = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [course, setCourse] = useState(
    getCourseFromCookie() || location.state.course
  );
  const [isChangeDetail, setIsChangeDetail] = useState({
    isChangeName: false,
    isChangeDateStart: false,
    isChangeDateEnd: false,
    isChangeDays: false,
  });

  const [isClickedOnEnrollStudent, setIsClickedOnEnrollStudent] =
    useState(false);
  const [isClikedOnPlacementProf, setIsClikedOnPlacementProf] = useState(false);
  const [isClickedOnRemoveBtn, setIsClickedOnRemoveBtn] = useState(false);

  const onClickChangeDetail = (detail) => {
    setIsChangeDetail({ ...isChangeDetail, [detail]: true });
  };

  const onSubmitNewDetail = (event) => {
    let newDetail = event.target.parentNode.children[0].value.trim();
    const fieldToChange = Object.keys(isChangeDetail).filter(
      (field) => isChangeDetail[field]
    );

    let detailToChange = "";
    switch (fieldToChange[0]) {
      case "isChangeName":
        detailToChange = "name";
        break;
      case "isChangeDateStart":
        detailToChange = "startDate";
        break;
      case "isChangeDateEnd":
        detailToChange = "endDate";
        break;
      case "isChangeDays":
        detailToChange = "dayClass";
        break;
    }
    if (fieldToChange[0] === "isChangeDays") {
      newDetail = newDetail.split(",");
    }

    editCourseDetails(course.name, detailToChange, newDetail).then(
      (courseDetail) => {
        setCourse(courseDetail);
        saveCourseCookie(courseDetail);
        setIsChangeDetail({ ...isChangeDetail, [fieldToChange[0]]: false });
      }
    );
  };

  const onClickAllCourses = () => {
    deleteCourseFromCookie();
    navigate("/all-courses");
  };
  const onClickRemoveBtn = () => {
    setIsClickedOnRemoveBtn(true);
  };
  const onClickEnrollStudent = () => {
    setIsClickedOnEnrollStudent(true);
  };

  const onClickPlacementProfessor = () => {
    setIsClikedOnPlacementProf(true);
  };

  const addUserToCourse = (event) => {
    setIsClickedOnEnrollStudent(false);
    setIsClikedOnPlacementProf(false);
    const email = event.target.parentNode.children[0].value.trim();
    findUserByEmail(email).then((user) => {
      if (user) {
        const courseId = course._id;
        const userId = user._id;

        registerUserToCourse(courseId, userId).then((data) => {
          setCourse(data.course);
          saveCourseCookie(data.course);
        });
      }
    });
  };

  const removeUserFromCourse = (event) => {
    setIsClickedOnRemoveBtn(false);
    const email = event.target.parentNode.children[0].value.trim();
    findUserByEmail(email).then((user) => {
      if (user) {
        const courseId = course._id;
        const userId = user._id;

        deleteUserFromCourse(courseId, userId).then((data) => {
          setCourse(data.course);
          saveCourseCookie(data.course);
        });
      }
    });
  };

  const findUserByEmail = async (email) => {
    const user = await findUser(email);

    return user;
  };

  return (
    <div className="edit-course-container">
      <h2>{course.name} Course</h2>

      <div>
        <p>Name: {course.name}</p>
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
          <input placeholder="Enter new course name" />{" "}
          <button onClick={onSubmitNewDetail}>Submit</button>
        </div>
      )}

      <div>
        <p>Date start: {course.startDate}</p>
        <button
          onClick={() => {
            onClickChangeDetail("isChangeDateStart");
          }}
        >
          Change
        </button>
      </div>
      {isChangeDetail.isChangeDateStart && (
        <div>
          <input placeholder="Enter new Date start DD/MM/YYYY" />
          <button onClick={onSubmitNewDetail}>Submit</button>
        </div>
      )}

      <div>
        <p>Date end: {course.endDate}</p>
        <button
          onClick={() => {
            onClickChangeDetail("isChangeDateEnd");
          }}
        >
          Change
        </button>
      </div>
      {isChangeDetail.isChangeDateEnd && (
        <div>
          <input placeholder="Enter new Date End DD/MM/YYYY" />
          <button onClick={onSubmitNewDetail}>Submit</button>
        </div>
      )}

      <div>
        <p>
          Days:
          {course.dayClass.map((day) => {
            return " " + convertNumberToDay(day) + ", ";
          })}
        </p>
        <button
          onClick={() => {
            onClickChangeDetail("isChangeDays");
          }}
        >
          Change
        </button>
      </div>
      {isChangeDetail.isChangeDays && (
        <div>
          <textarea
            placeholder="Enter the course days (day number) separated by a comma.
          for exmaple: '1, 2, 3' = Sunday, Monday, Tuesday"
            rows="4"
          />
          <button onClick={onSubmitNewDetail}>Submit</button>
        </div>
      )}

      <div>
        <p>
          professor:{" "}
          {course.professor?.name
            ? course.professor.name
            : "No professor has been assigned to the course.."}
        </p>
      </div>

      <div>
        <p>
          Student:
          {course.registers.map((student) => {
            console.log(student.name);
            return ` ${student.name}, `;
          })}
        </p>
      </div>

      {isClickedOnEnrollStudent && (
        <div>
          <input placeholder="Enter student Email" />{" "}
          <button onClick={addUserToCourse}>Submit</button>
        </div>
      )}

      {isClikedOnPlacementProf && (
        <div>
          <input placeholder="Enter professor Email" />
          <button onClick={addUserToCourse}>Submit</button>
        </div>
      )}

      {isClickedOnRemoveBtn && (
        <div>
          <input placeholder="Enter prof/student Email" />
          <button onClick={removeUserFromCourse}>Submit</button>
        </div>
      )}

      <div className="buttons-container">
        <button onClick={onClickEnrollStudent}>Enroll student</button>
        <button onClick={onClickPlacementProfessor}>Placement professor</button>
        <button onClick={onClickRemoveBtn}>Remove student/professor</button>
        <button onClick={onClickAllCourses}>Return all courses</button>
      </div>
    </div>
  );
};

export default EditCourse;
