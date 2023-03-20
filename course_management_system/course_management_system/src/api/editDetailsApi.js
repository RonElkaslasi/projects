import axios from "axios";
import { getUserFromCookie } from "../cookies/cookies";

export const changeDetail = async (detail, value, user) => {
  const editDetailUrl = "http://localhost:4000/personal-details";
  const token = !user.token.token ? user.token : user.token.token;

  try {
    const res = await axios({
      method: "patch",
      url: editDetailUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: {
        [detail]: value,
      },
    });

    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      throw new Error("Cannot edit that.");
    }
  }
};

export const changePassword = async (currentPassword, newPassword, user) => {
  const editPasswordUrl = "http://localhost:4000/change-password";
  // const realToken = user.token;
  const token = user.tokens[user.tokens.length - 1].token;
  // console.log(token);
  const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{0,}$/;

  if (!passRegex.test(newPassword)) throw new Error("*Invalid password");

  try {
    const res = await axios({
      method: "patch",
      url: editPasswordUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: {
        currentPassword: currentPassword,
        newPassword: newPassword,
      },
    });

    return res.data;
  } catch (err) {
    if (
      err.response &&
      (err.response.status === 500 || err.response.status === 400)
    ) {
      throw new Error("*Invalid password");
    }
  }
};
