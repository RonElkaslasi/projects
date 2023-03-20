import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  editCourseDetails,
  findUser,
  getUserDetail,
  registerUserToCourse,
  deleteUserFromCourse,
  getAllStudents,
  getAllProfessors,
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
  const [errorMessage, setErrorMessage] = useState("");
  const onClickChangeDetail = (detail) => {
    setIsChangeDetail({ ...isChangeDetail, [detail]: true });
  };

  const [newDays, setNewDays] = useState([]);
  const [studentsList, setStudentList] = useState([]);
  const [professorsList, setProfessorsList] = useState([]);
  const [daysToCheckbox, setDaysToCheckbox] = useState([]);

  useEffect(() => {
    getAllStudentOptions();
    getAllProfessorsOption();
    // checkedDaysCourse();
  }, []);
  const checkedDaysCourse = () => {
    let daysName = [];
    course.dayClass.map((day) => {
      let nameOfDay = convertNumberToDay(day);
      daysName.push(nameOfDay);
      setDaysToCheckbox(daysName);
      // console.log(daysToCheckbox);
    });
  };
  const onClickCheckbox = (event) => {
    newDays.push(event.target.value);
    // console.log(newDays);
    setNewDays(newDays);
  };

  const onSubmitNewDetail = (event) => {
    let newDetail;
    const fieldToChange = Object.keys(isChangeDetail).filter(
      (field) => isChangeDetail[field]
    );

    if (fieldToChange[0] === "isChangeDays") newDetail = newDays;
    else newDetail = event.target.parentNode.children[0].value.trim();

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

    editCourseDetails(course.name, detailToChange, newDetail).then(
      (courseDetail) => {
        setCourse(courseDetail);
        saveCourseCookie(courseDetail);
        setIsChangeDetail({ ...isChangeDetail, [fieldToChange[0]]: false });
        setNewDays([]);
      },
      (err) => {
        setErrorMessage("*Invalid input");
        setIsChangeDetail({ ...isChangeDetail, [fieldToChange[0]]: false });
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      }
    );
  };

  const getAllStudentOptions = () => {
    getAllStudents().then((students) => {
      console.log(students);
      setStudentList(students);
    });
  };

  const getAllProfessorsOption = () => {
    getAllProfessors().then((professors) => {
      console.log(professors);
      setProfessorsList(professors);
    });
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
  // const onClickCourseSchedule = () => {
  //   navigate("/all-courses/schedule-classes-for-course", { state: { course } });
  // };

  const onClickPlacementProfessor = () => {
    setIsClikedOnPlacementProf(true);
  };

  const addUserToCourse = (event) => {
    setIsClickedOnEnrollStudent(false);
    setIsClikedOnPlacementProf(false);
    const email = event.target.parentNode.children[0].value.trim();
    console.log(email);
    findUserByEmail(email).then(
      (user) => {
        if (user) {
          const courseId = course._id;
          const userId = user._id;

          registerUserToCourse(courseId, userId).then(
            (data) => {
              setCourse(data.course);
              saveCourseCookie(data.course);
            },
            (err) => {
              setErrorMessage(err.message);
              console.log(err.status);
              setTimeout(() => {
                setErrorMessage("");
              }, 2000);
            }
          );
        } else {
          setCourse(getCourseFromCookie());
        }
      },
      (err) => {
        setErrorMessage(err.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      }
    );
  };

  const removeUserFromCourse = (event) => {
    setIsClickedOnRemoveBtn(false);
    const email = event.target.parentNode.children[0].value.trim();
    findUserByEmail(email).then((user) => {
      if (user) {
        const courseId = course._id;
        const userId = user._id;

        deleteUserFromCourse(courseId, userId).then(
          (data) => {
            setCourse(data.course);
            saveCourseCookie(data.course);
          },
          (err) => {
            console.log(err.message);
          }
        );
      }
    });
  };

  const findUserByEmail = async (email) => {
    const user = await findUser(email);

    return user;
  };

  const closeInputChangeDetail = (event) => {
    const name = event.target.innerText;
    console.log(name);
    if (name.includes("Student")) setIsClickedOnEnrollStudent(false);
    else if (name.includes("professor")) setIsClikedOnPlacementProf(false);

    switch (name) {
      case name.includes("Student"):
        setIsClickedOnEnrollStudent(false);
        break;
      case name.includes("professor"):
        setIsClikedOnPlacementProf(false);
        break;
      case name.includes("Days"):
        setIsChangeDetail({ ...isChangeDetail, ["isChangeDays"]: false });
        break;
      case name.includes("Date end"):
        setIsChangeDetail({ ...isChangeDetail, ["isChangeDateEnd"]: false });
        break;
      case name.includes("Date start"):
        setIsChangeDetail({ ...isChangeDetail, ["isChangeDateStart"]: false });
        break;
      case name.includes("Name"):
        setIsChangeDetail({ ...isChangeDetail, ["isChangeName"]: false });
        break;
    }
  };

  return (
    <div className="edit-course-container">
      <h2>{course.name} Course</h2>

      <div /*onClick={closeInputChangeDetail}*/>
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
        <p>Date start: {course.startDate.slice(0, 10)}</p>
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
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            max={
              new Date(new Date().getFullYear(), 11, 32)
                .toISOString()
                .split("T")[0]
            }
          />
          <button onClick={onSubmitNewDetail}>Submit</button>
        </div>
      )}

      <div>
        <p>Date end: {course.endDate.slice(0, 10)}</p>
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
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            max={
              new Date(new Date().getFullYear(), 11, 32)
                .toISOString()
                .split("T")[0]
            }
          />
          <button onClick={onSubmitNewDetail}>Submit</button>
        </div>
      )}

      <div>
        <p>
          Days:
          {course.dayClass.map((day) => {
            console.log(day);
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
          <div className="days-container">
            <div>
              <label>Sunday</label>
              <input
                type="checkbox"
                name="courseDays"
                value={1}
                onChange={onClickCheckbox}
                // checked={daysToCheckbox.includes("Sunday")}
              />
            </div>
            <div>
              <label>Monday</label>
              <input
                type="checkbox"
                name="courseDays"
                value={2}
                onChange={onClickCheckbox}
                // checked={daysToCheckbox.includes("Monday")}
              />
            </div>
            <div>
              <label>Tuesday</label>
              <input
                type="checkbox"
                name="courseDays"
                value={3}
                onChange={onClickCheckbox}
                // checked={daysToCheckbox.includes("Tuesday")}
              />
            </div>
            <div>
              <label>Wednesday</label>
              <input
                type="checkbox"
                name="courseDays"
                value={4}
                onChange={onClickCheckbox}
                // checked={daysToCheckbox.includes("Wednesday")}
              />
            </div>
            <div>
              <label>Thursday</label>
              <input
                type="checkbox"
                name="courseDays"
                value={5}
                onChange={onClickCheckbox}
                // checked={daysToCheckbox.includes("Thursday")}
              />
            </div>
            <div>
              <label>Friday</label>
              <input
                type="checkbox"
                name="courseDays"
                value={6}
                onChange={onClickCheckbox}
                // checked={daysToCheckbox.includes("Friday")}
              />
            </div>
            <div>
              <label>Saturday</label>
              <input
                type="checkbox"
                name="courseDays"
                value={7}
                onChange={onClickCheckbox}
                // checked={daysToCheckbox.includes("Saturday")}
              />
            </div>
          </div>
          <button onClick={onSubmitNewDetail}>Submit</button>
        </div>
      )}

      <div /*onClick={closeInputStudentAndProfessor}*/>
        <p>
          professor:{" "}
          {course.professor?.name
            ? course.professor.name
            : "No professor has been assigned to the course.."}
        </p>
      </div>

      <div /*onClick={closeInputStudentAndProfessor}*/>
        <p>
          Student:
          {course.registers.map((student) => {
            console.log(student);
            return ` ${student.name}, `;
          })}
        </p>
      </div>
      {errorMessage !== "" && (
        <span className="error-message">{errorMessage}</span>
      )}
      {isClickedOnEnrollStudent && (
        <div>
          <select>
            <option>Students List</option>
            {studentsList.map((student) => {
              return <option key={student._id}>{student.email}</option>;
            })}
          </select>
          <button onClick={addUserToCourse}>Submit</button>
        </div>
      )}

      {isClikedOnPlacementProf && (
        <div>
          <select>
            <option>Professors List</option>
            {professorsList.map((professor) => {
              return <option key={professor._id}>{professor.email}</option>;
            })}
          </select>
          {/* <input placeholder="Enter professor Email" /> */}
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
        {/* <button className="add-course-button" onClick={onClickCourseSchedule}>
          Add class to course
        </button> */}
        <button onClick={onClickEnrollStudent}>Enroll student</button>
        <button onClick={onClickPlacementProfessor}>Placement professor</button>
        <button onClick={onClickRemoveBtn}>Remove student/professor</button>
        <button onClick={onClickAllCourses}>Return all courses</button>
      </div>
    </div>
  );
};

export default EditCourse;
