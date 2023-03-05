import React, { useEffect, useState } from "react";
import {
  deleteCourse,
  getAllCoursesForProfessor,
  getUserDetail,
} from "../../api/coursesAndUsersApi";
import { getUserFromCookie } from "../../cookies/cookies";
import { nanoid } from "nanoid";
import { NavLink, useNavigate } from "react-router-dom";
import EditCourse from "./EditCourse";
import { convertNumberToDay } from "../../utils/utils";

const AllCourses = (props) => {
  const user = getUserFromCookie();
  const [courses, setCourses] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [professorName, setProfessorName] = useState("");
  // const [courseId, setCourseId] = useState("");
  // let courseId = "";
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await getAllCoursesForProfessor(user);
    setCourses(response);
  };
  useEffect(() => {
    fetchData();
  }, [courses]);

  const getUserName = (id) => {
    getUserDetail(id).then(
      (userData) => {
        if (userData.roll === "professor") {
          setProfessorName(userData.name);
        } else setStudentName(userData.name);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const onClickAddCourseButton = () => {
    navigate("/all-courses/add-course");
  };
  const onClickEditCourseButton = (course) => {
    navigate("/all-courses/edit-course", { state: { course } });
  };
  const onClickDeleteCourseButton = (courseId) => {
    console.log(courseId);
    deleteCourse(courseId).then((courseData) => {
      console.log(courseData);
      // navigate("/professor-dashboard");
      // navigate("/professor-dashboard");
    });
  };

  return (
    <div className="courses">
      <h2>Courses List</h2>
      {courses.length > 0 &&
        courses.map((course) => {
          // courseId = course._id;
          if (course.professor !== undefined) getUserName(course.professor);
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
                    const modal = nanoid();
                    return (
                      <span key={modal} className="days detail">
                        {" "}
                        <br />
                        {convertNumberToDay(day)}
                      </span>
                    );
                  })}
                </div>
              </span>
              <span className="title">
                Professor:
                <br />
                {course.professor && (
                  <span className="detail">{professorName}</span>
                )}
              </span>
              {/* <span>Prof.Ron</span> */}

              <div>
                <span className="title">Students:</span>
                {course.registers.length > 0
                  ? course.registers.map((student) => {
                      getUserName(student._id);
                      return (
                        <span key={student._id} className="detail">
                          {studentName}
                        </span>
                      );
                    })
                  : ""}
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
        })}
      <button className="add-course-button" onClick={onClickAddCourseButton}>
        Add Course
      </button>
    </div>
  );
};

export default AllCourses;
