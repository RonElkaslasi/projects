import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { courseAttendance } from "../../api/attendencyApi";
import Loader from "../main/Loader";

const ClassAttendanceList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state.course;
  const classDate = location.state.classDate;
  const [allClassAttends, setAllClassAttends] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const fetchData = () => {
    // console.log(course);
    courseAttendance(course).then(
      (attends) => {
        setAllClassAttends(attends);
        console.log(allClassAttends);
      },
      (err) => {
        setErrorMessage(err.message);
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderAttendanceData = () => {
    const attendanceDate = [];

    for (const attend in allClassAttends) {
      const dataAttend = allClassAttends[attend];
      console.log(dataAttend);
      dataAttend.classes.map((lesson) => {
        let currLesson = lesson;
        if (currLesson.date === classDate) {
          attendanceDate.push(
            <div className="course-details-container">
              <span className="title">
                Date: <span className="detail">{lesson.date.slice(0, 10)}</span>
              </span>
              <span className="title">
                Student:{" "}
                <span className="detail">{dataAttend.student.name}</span>
              </span>
              <span className="title">
                present:{" "}
                <span className="detail">
                  {!lesson.present ? "Not present" : "Present"}
                </span>
              </span>
              {!lesson.present && (
                <span className="title">
                  reason: <span className="detail">{lesson.reason}</span>
                </span>
              )}
            </div>
          );
        }
        // return attendanceDate;
      });
    }

    return attendanceDate;
  };

  const onclickBackLessonsList = () => {
    navigate("/all-courses/course-lessons-list", { state: { course } });
  };

  return (
    <div className="courses">
      <h2>Attendance List {course.name} Course</h2>
      {errorMessage !== "" && <span className="empty-student-list"></span>}
      {Object.keys(allClassAttends).length > 0 || errorMessage != "" ? (
        renderAttendanceData()
      ) : (
        <Loader />
      )}
      <button onClick={onclickBackLessonsList}>Back to lessons list</button>
    </div>
  );
};

export default ClassAttendanceList;
