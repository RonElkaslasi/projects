import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyCourses } from "../../api/coursesAndUsersApi";
import { getUserFromCookie } from "../../cookies/cookies";
import { convertNumberToDay } from "../../utils/utils";
import Loader from "../main/Loader";

const MyCourses = () => {
  const navigate = useNavigate();
  const user = getUserFromCookie();
  const [myCourses, setMyCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await getMyCourses();
      setMyCourses(response);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(err.message);
      setMyCourses([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onClickLessonList = (classes, course) => {
    navigate("/student-dashboard/my-courses/course-lessons", {
      state: { classes, course },
    });
  };

  const isLoader = myCourses.length === 0 && errorMessage === "";

  return (
    <div className="courses">
      <h2>{!user.token ? user.name : user.user.name}'s Courses</h2>

      {errorMessage !== "" && (
        <div className="empty-student-list">
          {/* <span>{errorMessage}</span> */}
        </div>
      )}

      {myCourses.length > 0
        ? myCourses.map((course) => {
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
                  End:
                  <span className="detail">{course.endDate.slice(0, 10)}</span>
                </span>

                <span className="title">
                  Professor:
                  {
                    <span className="detail">
                      {course.professor?.name || ""}
                    </span>
                  }
                </span>

                <span>
                  <div className="days title">
                    <span>Days:</span>
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
                    {/* <option className="head-line-select">Students</option> */}
                    {course.registers.map((student) => {
                      return (
                        <option disabled key={student._id}>
                          {student.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <button
                  onClick={() => {
                    onClickLessonList(course.classes, course);
                  }}
                >
                  Lessons list
                </button>
              </div>
            );
          })
        : isLoader && <Loader />}
    </div>
  );
};

export default MyCourses;
