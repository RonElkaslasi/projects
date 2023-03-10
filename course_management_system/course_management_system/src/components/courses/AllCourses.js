import React, { useEffect, useState } from "react";
import {
  deleteCourse,
  getAllCoursesForProfessor,
} from "../../api/coursesAndUsersApi";
import { getUserFromCookie } from "../../cookies/cookies";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { convertNumberToDay } from "../../utils/utils";
import Loader from "../main/Loader";

const AllCourses = (props) => {
  const user = getUserFromCookie();
  const [courses, setCourses] = useState([]);
  // const [studentName, setStudentName] = useState("");
  // const [professorName, setProfessorName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // const fetchData = async () => {
  //   const response = await getAllCoursesForProfessor(user);
  //   console.log(response);
  //   setCourses(response);
  // };

  const fetchData = async () => {
    try {
      const response = await getAllCoursesForProfessor(user);
      console.log(response);
      setCourses(response);
      setErrorMessage("");
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
      setCourses([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onClickAddCourseButton = () => {
    navigate("/all-courses/add-course");
  };
  const onClickEditCourseButton = (course) => {
    navigate("/all-courses/edit-course", { state: { course } });
  };
  const onClickDeleteCourseButton = (courseId) => {
    console.log(courseId);
    deleteCourse(courseId).then((courseData) => {
      fetchData();
      console.log(courseData);
    });
  };

  const isLoader = courses.length === 0 && errorMessage === "";

  return (
    <div className="courses">
      <h2>Courses List</h2>
      {errorMessage !== "" && (
        <div className="empty-student-list">
          <span>{errorMessage}</span>
        </div>
      )}
      {courses.length > 0
        ? courses.map((course) => {
            return (
              <div key={course._id} className="course-details-container">
                <span className="title">
                  Name: <br />
                  <span className="detail">{course.name}</span>
                </span>

                <span className="title">
                  Start: <br />
                  <span className="detail">{course.startDate}</span>
                </span>
                <span className="title">
                  End: <br />
                  <span className="detail">{course.endDate}</span>
                </span>
                <span>
                  <div className="days title">
                    Days:
                    {course.dayClass.map((day) => {
                      return (
                        <span key={nanoid()} className="days detail">
                          {" "}
                          {convertNumberToDay(day)}
                        </span>
                      );
                    })}
                  </div>
                </span>
                <span className="title">
                  Professor:
                  <br />
                  {
                    <span className="detail">
                      {course.professor?.name || ""}
                    </span>
                  }
                </span>

                <div>
                  <span className="title">Students:</span>
                  {course.registers.map((student) => {
                    return (
                      <span key={student._id} className="detail">
                        {student.name}
                      </span>
                    );
                  })}
                </div>

                <div className="buttons-course-container">
                  <button
                    className="delete-course-button"
                    onClick={() => {
                      onClickDeleteCourseButton(course._id);
                    }}
                  >
                    Delete Course
                  </button>
                  <button
                    className="edit-course-button"
                    onClick={() => {
                      onClickEditCourseButton(course);
                    }}
                  >
                    Edit Course
                  </button>
                </div>
              </div>
            );
          })
        : isLoader && <Loader />}
      {!isLoader && (
        <button className="add-course-button" onClick={onClickAddCourseButton}>
          Add Course
        </button>
      )}
    </div>
  );
};

export default AllCourses;
