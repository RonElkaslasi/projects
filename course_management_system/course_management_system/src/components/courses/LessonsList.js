import { nanoid } from "nanoid";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LessonsList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onClickReturnAllCoursesButton = () => {
    navigate("/all-courses");
  };
  const onClickLessonAttendBtn = (classDate) => {
    navigate("/all-courses/course-lessons-list/lesson-attend", {
      state: { course: location.state.course, classDate: classDate },
    });
  };

  const isClassInFuture = (classDate) => {
    const targetDate = new Date(classDate);

    const currDate = new Date();

    return currDate < targetDate;
  };
  return (
    <div className="lessons">
      <h2>{location.state.course.name} Lessons List</h2>
      {location.state.course.classes.length > 0 &&
        location.state.course.classes.map((classDate, index) => {
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

              <button
                onClick={() => {
                  onClickLessonAttendBtn(classDate);
                }}
                disabled={isFuture}
              >
                Lesson attendance
              </button>
            </div>
          );
        })}
      <button onClick={onClickReturnAllCoursesButton}>
        Return to all courses
      </button>
    </div>
  );
};

export default LessonsList;
