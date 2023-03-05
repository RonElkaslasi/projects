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

  const validateForm = () => {
    return (
      formData.courseName === "" ||
      formData.courseStartDate === "" ||
      formData.courseEndDate === "" ||
      formData.courseDays.length === 0
    );
  };

  const onChangeCourseDetail = (event) => {
    const { name, value } = event.target;

    if (name === "courseDays") {
      if (!value) {
        setFormData({ ...formData, courseDays: [] });
      } else {
        setFormData({
          ...formData,
          courseDays: value.split(",").map((day) => parseInt(day.trim())),
        });
      }
    } else {
      setFormData({ ...formData, [name]: value.trim() });
    }
  };
  const onClickAddCourseBtn = (event) => {
    event.preventDefault();

    addNewCourse(formData).then((courseData) => {
      console.log(courseData);
      navigate("/all-courses");
    });
  };

  const onClickBackToCoursesBtn = () => {
    navigate("/all-courses");
  };
  return (
    <div className="add-course-countainer">
      <form className="add-course-form">
        <h2>Course Details</h2>
        <input
          placeholder="Course name"
          name="courseName"
          value={formData.courseName}
          onChange={onChangeCourseDetail}
        />
        <input
          placeholder="Date start DD/MM/YYYY"
          name="courseStartDate"
          value={formData.courseStartDate}
          onChange={onChangeCourseDetail}
        />
        <input
          placeholder="endDate DD/MM/YYYY"
          name="courseEndDate"
          value={formData.courseEndDate}
          onChange={onChangeCourseDetail}
        />
        <textarea
          placeholder="Enter the course days (day number) separated by a comma.
          for exmaple: '1, 2, 3' = Sunday, Monday, Tuesday"
          rows="7"
          name="courseDays"
          value={
            formData.courseDays.length > 0
              ? formData.courseDays.join(",")
              : undefined
          }
          onBlur={onChangeCourseDetail}
        ></textarea>
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
