import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewCourse } from "../../api/coursesAndUsersApi";

const AddCourse = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseName: "",
    courseStartDate: "",
    courseEndDate: "",
    courseDays: [],
  });
  const [errorMessage, setErrorMessage] = useState("");
  const currentDate = new Date().toLocaleString();

  const validateForm = () => {
    return (
      formData.courseName === "" ||
      formData.courseStartDate === "" ||
      formData.courseEndDate === "" ||
      formData.courseDays.length === 0
    );
  };

  const onChangeCourseDetail = (event) => {
    setErrorMessage("");
    const { name, value } = event.target;
    if (name === "courseDays") {
      if (!value) {
        setFormData({ ...formData, courseDays: [] });
      } else {
        formData.courseDays.push(value);
        setFormData({
          ...formData,
          courseDays: formData.courseDays,
        });
      }
    } else {
      setFormData({ ...formData, [name]: value.trim() });
    }
  };

  const onClickAddCourseBtn = (event) => {
    event.preventDefault();
    console.log(formData);
    addNewCourse(formData).then(
      (courseData) => {
        navigate("/all-courses");
      },
      (err) => {
        if (err.message === "The course already exist.") {
          setErrorMessage(`${formData.courseName} course already exist.`);
        }
      }
    );
  };

  const onClickBackToCoursesBtn = () => {
    navigate("/all-courses");
  };

  return (
    <div className="add-course-countainer">
      <form className="add-course-form">
        <h2>Course Details</h2>
        {errorMessage !== "" && (
          <div className="error-message">{errorMessage}</div>
        )}
        <input
          placeholder="Course name"
          name="courseName"
          value={formData.courseName}
          onChange={onChangeCourseDetail}
        />
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          max={
            new Date(new Date().getFullYear(), 11, 32)
              .toISOString()
              .split("T")[0]
          }
          name="courseStartDate"
          value={formData.courseStartDate}
          onChange={onChangeCourseDetail}
        />
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          max={
            new Date(new Date().getFullYear(), 11, 32)
              .toISOString()
              .split("T")[0]
          }
          name="courseEndDate"
          value={formData.courseEndDate}
          onChange={onChangeCourseDetail}
        />

        <div className="days-holder">
          <span>Days:</span>
          <div className="days-container">
            <label>Sunday</label>
            <input
              type="checkbox"
              name="courseDays"
              value={1}
              onChange={onChangeCourseDetail}
            />
          </div>
          <div className="days-container">
            <label>Monday</label>
            <input
              type="checkbox"
              name="courseDays"
              value={2}
              onChange={onChangeCourseDetail}
            />
          </div>
          <div className="days-container">
            <label>Tuesday</label>
            <input
              type="checkbox"
              name="courseDays"
              value={3}
              onChange={onChangeCourseDetail}
            />
          </div>
          <div className="days-container">
            <label>Wednesday</label>
            <input
              type="checkbox"
              name="courseDays"
              value={4}
              onChange={onChangeCourseDetail}
            />
          </div>
          <div className="days-container">
            <label>Thursday</label>
            <input
              type="checkbox"
              name="courseDays"
              value={5}
              onChange={onChangeCourseDetail}
            />
          </div>
          <div className="days-container">
            <label>Friday</label>
            <input
              type="checkbox"
              name="courseDays"
              value={6}
              onChange={onChangeCourseDetail}
            />
          </div>
          <div className="days-container">
            <label>Saturday</label>
            <input
              type="checkbox"
              name="courseDays"
              value={7}
              onChange={onChangeCourseDetail}
            />
          </div>
        </div>

        <div className="add-course-btns-container">
          <button
            className="back-to-all-courses-button"
            onClick={onClickBackToCoursesBtn}
          >
            Back to courses
          </button>
          <button disabled={validateForm()} onClick={onClickAddCourseBtn}>
            Add course
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
