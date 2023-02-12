const logoutIcon = document.getElementById("logout");
const logo = document.getElementById("logo");
const deleteUserButton = document.getElementById("delete-user");
const nameForIcon = document.getElementById("name-for-icon");
const cartIcon = document.getElementById("cart-icon");

const changeEmailButton = document.getElementById("change-email-button");
const changeNameButton = document.getElementById("change-name-button");
const changePassButton = document.getElementById("change-pass-button");
const modalEmailContainer = document.getElementById("modal-email-container");
const modalNameContainer = document.getElementById("modal-name-container");
const modalPassContainer = document.getElementById("modal-pass-container");
const emailUser = document.getElementById("email");
const nameUser = document.getElementById("name");
const passUser = document.getElementById("pass");
const newEmailButton = document.getElementById("new-email-button");
const newNameButton = document.getElementById("new-name-button");
const newPassButton = document.getElementById("new-pass-button");
const inputNewPass = document.getElementById("input-password");

const loadDashboardInterface = () => {
  const url = "http://localhost:3000/user/get-user";
  const token = localStorage.getItem("token");

  fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((user) => {
      console.log(user);
      emailUser.innerText = user.email;
      nameUser.innerText =
        user.name.charAt(0).toUpperCase() + user.name.slice(1);
      nameForIcon.innerText = user.name.charAt(0).toUpperCase();
    })
    .catch((err) => {
      console.log(err);
    });
};
const deleteUser = () => {
  url = "http://localhost:3000/user/delete";
  const token = localStorage.getItem("token");

  fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      if (res.ok) {
        if (res.headers.get("Content-Type") === "application/json") {
          return res.json();
        } else {
          console.log("Response is not a JSON");
          return {};
        }
      } else throw new Error(res.status);
    })
    .then((data) => {
      const url = "http://localhost:3000/";
      localStorage.removeItem("token");
      window.open(url, "_self");
    })
    .catch((err) => {
      console.log(err);
    });
};

const changeDetail = (fieldToChange, value, fieldAfterChange) => {
  const url = "http://localhost:3000/user/edit";
  const token = localStorage.getItem("token");

  fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      [fieldToChange]: value,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      else throw new Error(res.status);
    })
    .then((data) => {
      console.log(data);
      fieldAfterChange.innerText = data[fieldToChange];
    })
    .catch((err) => {
      console.log(err);
    });
};

//---------------------------------------Events---------------------------------------------------------//
cartIcon.addEventListener("click", () => {
  const url = "http://localhost:3000/cart";
  window.open(url, "_self");
});
newPassButton.addEventListener("click", () => {
  changeDetail("password", inputNewPass.value, passUser);
});

newNameButton.addEventListener("click", () => {
  const inputNewName = document.getElementById("input-name");

  changeDetail("name", inputNewName.value, nameUser);
  nameForIcon.innerText = inputNewName.value.charAt(0).toUpperCase();
});

newEmailButton.addEventListener("click", (e) => {
  const inputNewEmail = document.getElementById("input-email");

  changeDetail("email", inputNewEmail.value, emailUser);
});

logoutIcon.addEventListener("click", () => {
  const url = "http://localhost:3000/";
  localStorage.removeItem("token");
  window.open(url, "_self");
});

logo.addEventListener("click", () => {
  const url = "http://localhost:3000/";
  window.open(url, "_self");
});

deleteUserButton.addEventListener("click", () => {
  deleteUser();
});

changeEmailButton.addEventListener("click", () => {
  modalEmailContainer.classList.remove("none");
  modalEmailContainer.classList.add("modal-input-container");
});

modalEmailContainer.addEventListener("click", (e) => {
  if (!e.target.matches("input")) {
    modalEmailContainer.classList.add("none");
  }
});

changeNameButton.addEventListener("click", () => {
  modalNameContainer.classList.remove("none");
  modalNameContainer.classList.add("modal-input-container");
});
modalNameContainer.addEventListener("click", (e) => {
  if (!e.target.matches("input")) {
    modalNameContainer.classList.add("none");
  }
});

changePassButton.addEventListener("click", () => {
  modalPassContainer.classList.remove("none");
  modalPassContainer.classList.add("modal-input-container");
});
modalPassContainer.addEventListener("click", (e) => {
  if (!e.target.matches("input")) {
    modalPassContainer.classList.add("none");
  }
});

loadDashboardInterface();
