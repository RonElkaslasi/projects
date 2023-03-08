import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { getMyCourses } from "../../api/coursesAndUsersApi";
import { getUserFromCookie } from "../../cookies/cookies";
import { convertNumberToDay } from "../../utils/utils";
import Loader from "../main/Loader";

const MyCourses = () => {
  const user = getUserFromCookie();
  const [myCourses, setMyCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await getMyCourses();
      console.log(response);
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

  const isLoader = myCourses.length === 0 && errorMessage === "";
  return (
    <div className="courses">
      <h2>{!user.token ? user.name : user.user.name}'s Courses</h2>

      {errorMessage !== "" && (
        <div className="empty-student-list">
          <span>{errorMessage}</span>
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
                  <span className="detail">{course.startDate}</span>
                </span>

                <span className="title">
                  End: <br />
                  <span className="detail">{course.endDate}</span>
                </span>

                <span>
                  <div className="days title">
                    Days:{" "}
                    {course.dayClass.map((day) => {
                      return (
                        <span key={nanoid()} className="days detail">
                          {convertNumberToDay(day)}
                        </span>
                      );
                    })}
                  </div>
                </span>

                <span className="title">
                  Professor: <br />
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
              </div>
            );
          })
        : isLoader && <Loader />}
    </div>
  );
};

export default MyCourses;
