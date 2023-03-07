import axios from "axios";
import { getUserFromCookie } from "../cookies/cookies";

export const getAllCoursesForProfessor = async (user) => {
  const getCoursesUrl = "http://localhost:4000/courses";
  const token = !user.token.token ? user.token : user.token.token;

  try {
    const res = await axios({
      method: "get",
      url: getCoursesUrl,
      headers: {
        Authorization: token,
      },
    });

    return res.data;
  } catch (err) {
    // if (err.rsponse) {
    throw new Error(JSON.stringify(err.rsponse));
    // }
  }
};

export const getUserDetail = async (id) => {
  const getUserUrl = `http://localhost:4000/user-data?id=${id}`;

  try {
    const res = await axios.get(getUserUrl);
    return res.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const addNewCourse = async (courseData) => {
  const getAddCourseUrl = "http://localhost:4000/course";
  const token = getUserFromCookie().token;
  console.log(token);
  console.log(courseData);
  try {
    const res = await axios({
      method: "post",
      url: getAddCourseUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: {
        name: courseData.courseName,
        startDate: courseData.courseStartDate,
        endDate: courseData.courseEndDate,
        dayClass: courseData.courseDays,
      },
    });

    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 400) {
      throw new Error("The course already exist.");
    }
  }
};

export const addNewStudent = async (detailsStudent) => {
  const addNewStudentUrl = "http://localhost:4000/user";
  try {
    const res = await axios({
      method: "post",
      url: addNewStudentUrl,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: detailsStudent.name,
        birth: detailsStudent.birth,
        address: detailsStudent.address,
        email: detailsStudent.email,
        roll: "student",
        password: detailsStudent.password,
      },
    });

    return res.data;
  } catch (err) {
    if (err.rsponse && err.response.status === 400) {
      throw new Error("Email or password are not valid");
    }
  }
};
export const deleteCourse = async (id) => {
  const deleteCourseUrl = "http://localhost:4000/course";
  const token = getUserFromCookie().token;

  try {
    const res = await axios({
      method: "delete",
      url: deleteCourseUrl,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: {
        _id: id,
      },
    });

    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 404) {
      throw new Error("course not found");
    }
  }
};

export const editCourseDetails = async (
  courseName,
  detailToChange,
  newDetail
) => {
  const editCourseUrl = `http://localhost:4000/course-details/?name=${courseName}`;
  const token = getUserFromCookie().token;

  try {
    const res = await axios({
      method: "patch",
      url: editCourseUrl,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: {
        [detailToChange]: newDetail,
      },
    });

    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 400) {
      throw new Error("You cannot edit this.");
    }
  }
};

export const editUserDetail = async (detailToChange, newDetail) => {
  const editUserUrl = "http://localhost:4000/personal-details";
  console.log(detailToChange);
  console.log(newDetail);
  const currToken = getUserFromCookie().tokens
    ? getUserFromCookie().tokens[getUserFromCookie().tokens.length - 1].token
    : getUserFromCookie().token;
  console.log(currToken);
  try {
    const res = await axios({
      method: "patch",
      url: editUserUrl,
      headers: {
        Authorization: currToken,
        "Content-Type": "application/json",
      },
      data: {
        [detailToChange]: newDetail,
      },
    });

    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 400) {
      throw new Error("You cannot edit that.");
    }
  }
};

export const findUser = async (email) => {
  const findUrl = `http://localhost:4000/user?email=${email}`;
  console.log(email);

  try {
    const res = await axios.get(findUrl);

    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 500)
      throw new Error("No user found.");
  }
};

export const registerUserToCourse = async (courseId, userId) => {
  const addUserToCourseUrl = "http://localhost:4000/add-user-to-class";
  const token = getUserFromCookie().token;
  try {
    const res = await axios({
      method: "post",
      url: addUserToCourseUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: {
        userId: userId,
        courseId: courseId,
      },
    });

    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 404)
      throw new Error("Somthing happened");
    else throw err;
  }
};

export const deleteUserFromCourse = async (courseId, userId) => {
  const removeUserFromCourseUrl =
    "http://localhost:4000/delete-user-from-class";
  const token = getUserFromCookie().token;

  try {
    const res = await axios({
      method: "post",
      url: removeUserFromCourseUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: {
        userId: userId,
        courseId: courseId,
      },
    });

    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 404) {
      throw new Error("OOPS..not found course or user.");
    }
  }
};

export const getAllStudents = async () => {
  const allStudentsUrl = "http://localhost:4000/students";
  const token = getUserFromCookie().token;

  try {
    const res = await axios({
      method: "get",
      url: allStudentsUrl,
      headers: {
        Authorization: token,
      },
    });

    return res.data;
  } catch (err) {
    if (err.response && err.response.stauts === 404) {
      throw new Error("No student found.");
    }
  }
};

export const deleteStudent = async (studentId) => {
  const deletStudentUrl = `http://localhost:4000/user/?_id=${studentId}`;
  const token = getUserFromCookie().token;

  try {
    const res = await axios({
      method: "delete",
      url: deletStudentUrl,
      headers: {
        Authorization: token,
      },
    });

    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 404) {
      throw new Error("No student found.");
    }
  }
};
