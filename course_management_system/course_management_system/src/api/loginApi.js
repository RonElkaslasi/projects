import axios from "axios";

export const loginToSite = async (email, password) => {
  const loginUrl = "http://localhost:4000/login";

  try {
    const res = await axios({
      method: "post",
      url: loginUrl,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: email,
        password: password,
      },
    });

    console.log(res.data);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 400) {
      throw new Error("Email or password are invalid.");
    }
  }
};

export const logoutFromSite = async (token) => {
  const logoutUrl = "http://localhost:4000/logout";
  console.log(token);
  try {
    const res = await axios({
      method: "post",
      url: logoutUrl,
      headers: {
        Authorization: token,
      },
    });

    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      throw new Error("Somthing worng.");
    }
  }
};
// export const loginProfToSite = async (emailProf, passwordProf) => {
//   const loginProfUrl = "http://localhost:4000/professor/login";
//   console.log(emailProf);
//   console.log(passwordProf);
//   try {
//     const res = await axios({
//       method: "post",
//       url: loginProfUrl,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: {
//         email: emailProf,
//         password: passwordProf,
//       },
//     });

//     console.log(res.data);
//     return res.data;
//   } catch (err) {
//     if (err.response && err.response.status === 401) {
//       throw new Error("Email or password are invalid.");
//     }
//   }
// };

// export const loginStudentToSite = async (emailStudent, passwordStudent) => {
//   const loginStudentfUrl = "http://localhost:4000/student/login";
//   console.log(emailStudent);
//   console.log(passwordStudent);
//   try {
//     const res = await axios({
//       method: "post",
//       url: loginStudentfUrl,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: {
//         email: emailStudent,
//         password: passwordStudent,
//       },
//     });

//     console.log(res.data);
//     return res.data;
//   } catch (err) {
//     if (err.response && err.response.status === 401) {
//       throw new Error("Email or password are invalid.");
//     }
//   }
// };

export const subscireProfToSite = async (professorDetail) => {
  const subscribeUrl = "http://localhost:4000/user";

  try {
    const res = await axios({
      method: "post",
      url: subscribeUrl,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: professorDetail.name,
        birth: professorDetail.birth,
        address: professorDetail.address,
        email: professorDetail.email,
        roll: "professor",
        password: professorDetail.password,
      },
    });

    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 400) {
      throw new Error("Email or password are Invalid");
    }
  }
};
