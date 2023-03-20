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

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await getAllCoursesForProfessor(user);
      setCourses(response);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(err.message);
      setCourses([]);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(courses);
  }, []);

  const onClickAddCourseButton = () => {
    navigate("/all-courses/add-course");
  };
  const onClickEditCourseButton = (course) => {
    navigate("/all-courses/edit-course", { state: { course } });
  };

  const onClickLessonListButton = (course) => {
    navigate("/all-courses/course-lessons-list", { state: { course } });
  };
  const onClickDeleteCourseButton = (courseId) => {
    deleteCourse(courseId).then((courseData) => {
      fetchData();
    });
  };

  const isLoader = courses.length === 0 && errorMessage === "";

  return (
    <div className="courses">
      <h2>Courses List</h2>
      {errorMessage !== "" && (
        <div className="empty-student-list">
          {/* <span>{errorMessage}</span> */}
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
                  <span className="detail">
                    {course.startDate.slice(0, 10)}
                  </span>
                </span>
                <span className="title">
                  End: <br />
                  <span className="detail">{course.endDate.slice(0, 10)}</span>
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
                <span>
                  <div className="days title">
                    <span className="title">Days:</span>
                    <select multiple>
                      {/* <option>Days</option> */}
                      {course.dayClass.map((day) => {
                        return (
                          <option disabled key={nanoid()}>
                            {convertNumberToDay(day)}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </span>

                <div>
                  <span className="title">Students:</span>
                  <select multiple>
                    {/* <option>Students</option> */}
                    {course.registers.map((student) => {
                      return (
                        <option key={student._id} disabled>
                          {student.name}
                        </option>
                      );
                    })}
                  </select>
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
                  <button
                    onClick={() => {
                      onClickLessonListButton(course);
                    }}
                  >
                    Lessons list
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
