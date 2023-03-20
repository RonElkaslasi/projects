import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { courseAttendance } from "../../api/attendencyApi";
import { getUserFromCookie } from "../../cookies/cookies";
import Loader from "../main/Loader";

const CourseClasses = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [status, setStatus] = useState([]);
  const [reasons, setReasons] = useState([]);

  useEffect(() => {
    setClasses(location.state.course.classes);
  }, [classes]);

  useEffect(() => {
    getStatusAttend();
  }, []);

  const onClickReturnToMyCourses = () => {
    navigate("/student-dashboard/my-courses");
  };
  const isClassInFuture = (classDate) => {
    const targetDate = new Date(classDate);

    const currDate = new Date();

    return currDate < targetDate;
  };

  const onClickAttendencyBtn = (event) => {
    const courseDate =
      event.target.parentNode.children[1].children[0].innerText;
    console.log(courseDate);
    navigate("/student-dashboard/my-courses/course-lesson/add-attendency", {
      state: { course: location.state.course, courseDate: courseDate },
    });
  };

  const getStatusAttend = () => {
    courseAttendance(location.state.course).then((attends) => {
      console.log(attends);
      let att = attends.filter(
        (attend) => attend.student._id === getUserFromCookie()._id
      );

      let newReasons = [];
      let newStatuses = att[0].classes.map((classObj) => {
        if (classObj.present === false) newReasons.push(classObj.reason);

        return classObj.present ? "Present" : "Not present";
      });

      setStatus(newStatuses);
      setReasons(newReasons);
    });
  };

  return (
    <div className="lessons">
      <h2>{location.state.course.name} Lessons List</h2>

      {status.length > 0 ? (
        classes.map((classDate, index) => {
          const isFuture = isClassInFuture(classDate);

          return (
            <div className="course-details-container" key={nanoid()}>
              <span className="title">
                Lesson Number:
                <span className="detail">{index + 1}</span>
              </span>

              <span className="title">
                Date:
                <span className="detail">{classDate.slice(0, 10)}</span>
              </span>
              <span className="title">
                Status:
                <span className="detail">
                  {isFuture ? "Not yet held" : status[index]}
                </span>
              </span>
              {status[index] === "Not present" && (
                <span className="title">
                  Reason: <span className="detail">{reasons[index]}</span>
                </span>
              )}

              <button disabled={isFuture} onClick={onClickAttendencyBtn}>
                Attendance
              </button>
            </div>
          );
        })
      ) : (
        <Loader />
      )}
      <button onClick={onClickReturnToMyCourses}>Return to my courses</button>
    </div>
  );
};

export default CourseClasses;
