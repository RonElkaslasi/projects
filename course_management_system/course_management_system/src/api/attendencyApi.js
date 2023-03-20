import axios from "axios";
import { getUserFromCookie } from "../cookies/cookies";

export const addAttendenc = async (course, user, date, present, reason) => {
  const addAttendencUrl = "http://localhost:4000/attendance";
  const token =
    getUserFromCookie().tokens[getUserFromCookie().tokens.length - 1].token;
  const userId = user._id;
  console.log(date);
  try {
    const res = await axios({
      method: "patch",
      url: addAttendencUrl,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: {
        course: course,
        userId: userId,
        date: date,
        present: present,
        reason: reason,
      },
    });

    return res.data;
  } catch (err) {
    if (
      err.response &&
      (err.response.status === 404 || err.response.status === 400)
    )
      throw new Error("somthing happen");
  }
};

export const courseAttendance = async (course) => {
  const courseAttendUrl = `http://localhost:4000/course-attendencies`;

  try {
    const res = await axios.get(courseAttendUrl, { params: { course } });
    // const res = await axios({
    //   method: "get",
    //   url: courseAttendUrl,
    // });

    return res.data;
  } catch (err) {
    if (
      err.response &&
      (err.response.status === 404 || err.response.status === 400)
    )
      throw new Error("No found any attend");
  }
};
