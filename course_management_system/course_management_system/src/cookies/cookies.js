import Cookies from "js-cookie";

const USER_DATA = "user_data";
const COURSE_DATA = "course_data";

export const saveUserCookie = (userData) => {
  const jsonUserData = JSON.stringify(userData);
  Cookies.set(USER_DATA, jsonUserData, {
    expires: 24,
    sameSite: "strict",
    secure: true,
  });
};

export const deleteUserFromCookie = () => {
  Cookies.remove(USER_DATA, { secure: true, sameSite: "strict" });
};

export const getUserFromCookie = () => {
  const jsonUserData = Cookies.get(USER_DATA);

  if (jsonUserData === undefined) return null;

  return JSON.parse(jsonUserData);
};

export const getCourseFromCookie = () => {
  const jsonCourseData = Cookies.get(COURSE_DATA);
  if (jsonCourseData === undefined) return null;

  return JSON.parse(jsonCourseData);
};

export const saveCourseCookie = (courseData) => {
  const jsonCourseData = JSON.stringify(courseData);

  Cookies.set(COURSE_DATA, jsonCourseData, {
    expires: 24,
    sameSite: "strict",
    secure: true,
  });
};

export const deleteCourseFromCookie = () => {
  Cookies.remove(COURSE_DATA, { secure: true, sameSite: "strict" });
};
