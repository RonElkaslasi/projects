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
      throw new Error(err);
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
