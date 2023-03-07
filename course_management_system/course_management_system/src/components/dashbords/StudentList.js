import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { deleteStudent, getAllStudents } from "../../api/coursesAndUsersApi";

const StudentList = () => {
  const [studentsList, setStudentsList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchStudentsData();
  }, []);

  const fetchStudentsData = async () => {
    const response = await getAllStudents();
    console.log(response);
    setStudentsList(response);
  };

  const onClickDeleteBtn = (studentId) => {
    deleteStudent(studentId).then(
      (student) => {
        fetchStudentsData();
        console.log(student);
        setMessage("Student secssfully deleted");
      },
      (err) => {
        setMessage("Student not found");
      }
    );
  };
  return (
    <div className="student-list">
      <h2>Students List</h2>
      {studentsList?.length > 0 &&
        studentsList.map((student) => {
          {
            message !== "" && <span className="message">{message}</span>;
          }

          return (
            <div key={student._id} className="student-details-container">
              <span className="title">
                Name: <br /> <span className="detail">{student.name}</span>
              </span>

              <span className="title">
                Birth: <br /> <span className="detail">{student.birth}</span>
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
                email: <br /> <span className="detail">{student.email}</span>
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
        })}
    </div>
  );
};

export default StudentList;
