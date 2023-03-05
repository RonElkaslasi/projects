import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { editCourseDetails, getUserDetail } from "../../api/coursesAndUsersApi";
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
  const [professorName, setProfessorName] = useState("");
  const [StudentName, setStudentName] = useState("");

  useEffect(() => {
    saveCourseCookie(course);
    if (course.professor) getProfessorById();
  }, [course]);

  //   const getProfAndStudentName = () => {};
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
        // console.log({ ...courseDetail });
        console.log(course);
        setIsChangeDetail({ ...isChangeDetail, [fieldToChange]: false });
      }
    );
  };

  const onClickAllCourses = () => {
    deleteCourseFromCookie();
    navigate("/all-courses");
  };

  const getProfessorById = () => {
    getUserDetail(course.professor).then((professor) => {
      console.log(professor);
      setProfessorName(professor.name);
    });
  };

  const getStudentName = (id) => {
    getUserDetail(id).then((student) => {
      setStudentName(student.name);
    });
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
          {course.professor
            ? professorName
            : "No professor has been assigned to the course.."}
        </p>
      </div>

      <div>
        <p>
          Student:
          {course.registers.length > 0
            ? course.registers.map((student) => {
                getStudentName(student._id);
                return " " + StudentName + ", ";
              })
            : " No student are registered for the course.."}
        </p>
      </div>

      <div className="buttons-container">
        <button>Enroll student</button>
        <button>Placement professor</button>
        <button onClick={onClickAllCourses}>All Courses</button>
      </div>
    </div>
  );
};

export default EditCourse;
