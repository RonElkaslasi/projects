import axios from "axios";

export const loginProfToSite = async (emailProf, passwordProf) => {
  const loginProfUrl = "http://localhost:4000/professor/login";
  console.log(emailProf);
  console.log(passwordProf);
  try {
    const res = await axios({
      method: "post",
      url: loginProfUrl,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: emailProf,
        password: passwordProf,
      },
    });

    console.log(res.data);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      throw new Error("Email or password are invalid.");
    }
  }
};

export const loginStudentToSite = async (emailStudent, passwordStudent) => {
  const loginStudentfUrl = "http://localhost:4000/student/login";
  console.log(emailStudent);
  console.log(passwordStudent);
  try {
    const res = await axios({
      method: "post",
      url: loginStudentfUrl,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: emailStudent,
        password: passwordStudent,
      },
    });

    console.log(res.data);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      throw new Error("Email or password are invalid.");
    }
  }
};

