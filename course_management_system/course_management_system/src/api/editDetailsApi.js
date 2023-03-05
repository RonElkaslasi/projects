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
  const token = !user.token.token ? user.token : user.token.token;

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
    if (err.response || err.response.status === 500) {
      throw new Error(JSON.stringify(err.response));
    }
  }
};
