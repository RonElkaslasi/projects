import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { deleteStudent, getAllStudents } from "../../api/coursesAndUsersApi";
import Loader from "../main/Loader";

const StudentList = () => {
  const [studentsList, setStudentsList] = useState([]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    console.log(studentsList);
    fetchStudentsData();
  }, []);

  const fetchStudentsData = async () => {
    try {
      const response = await getAllStudents();
      console.log(response);
      setStudentsList(response);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const onClickDeleteBtn = (studentId) => {
    deleteStudent(studentId).then(
      (student) => {
        console.log(student);
        setMessage("Student was successfully deleted");
        setStudentsList(studentsList.filter((s) => s._id !== studentId));
        fetchStudentsData();
        setTimeout(() => {
          setMessage("");
        }, 2000);
      } /*,
      (err) => {
        setMessage("Student not found");
      }*/
    );
  };
  const isLoader2 = studentsList.length === 0 && errorMessage === "";
  return (
    <div className="student-list">
      <h2>Students List</h2>
      {errorMessage !== "" && (
        <div className="empty-student-list">
          <span>{errorMessage}</span>
        </div>
      )}
      {message !== "" && errorMessage === "" && (
        <div className="message">
          <span>{message} </span>
        </div>
      )}
      {
        studentsList.length > 0
          ? studentsList.map((student) => {
              return (
                <div key={student._id} className="student-details-container">
                  <span className="title">
                    Name: <br /> <span className="detail">{student.name}</span>
                  </span>

                  <span className="title">
                    Birth: <br />{" "}
                    <span className="detail">{student.birth}</span>
                  </span>

                  <span className="title">
                    Address: <br />{" "}
                    <span className="detail">{student.address}</span>
                  </span>
                  <span className="title">
                    Courses: <br />
                    {student.courses.length > 0 &&
                      student.courses.map((course) => {
                        return (
                          <span className="detail" key={nanoid()}>
                            {course.name}
                          </span>
                        );
                      })}
                  </span>
                  <span className="title">
                    email: <br />{" "}
                    <span className="detail">{student.email}</span>
                  </span>

                  <span className="title">
                    Password: <br /> <span className="detail">******</span>
                  </span>

                  <button
                    onClick={() => {
                      onClickDeleteBtn(student._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })
          : isLoader2 && <Loader />
        // <Loader />
      }
    </div>
  );
};

export default StudentList;
