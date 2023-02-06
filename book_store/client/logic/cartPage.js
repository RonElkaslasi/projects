const headerLogoContainer = document.getElementById("logo");
const emptyCartContainer = document.getElementById("empty-cart-container");
const SignInButton = document.getElementById("login");
const homeIcon = document.getElementById("home-icon");
const logoutButton = document.getElementById("logout");
const personalDashboard = document.getElementById("personal-dashboard");

logoutButton.addEventListener("click", () => {
  logoutUser();
  localStorage.removeItem("token");
  personalDashboard.classList.remove("fa");
  personalDashboard.classList.remove("fa-user");
  logoutButton.classList.remove("fa");
  logoutButton.classList.remove("fa-sign-out");
});
personalDashboard.addEventListener("click", () => {
  const url = "http://localhost:3000/dashboard";
  window.open(url, "_self");
});
homeIcon.addEventListener("click", () => {
  const url = "http://localhost:3000";
  window.open(url, "_self");
});
headerLogoContainer.addEventListener("click", () => {
  const url = "http://localhost:3000";
  window.open(url, "_self");
});

const loadCartInterface = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    cartUnragisterUser();
  } else {
    personalDashboard.classList.add("fa");
    personalDashboard.classList.add("fa-user");
    logoutButton.classList.add("fa");
    logoutButton.classList.add("fa-sign-out");
    emptyCartContainer.classList.toggle("none");
  }
};

const cartUnragisterUser = () => {
  const cart = localStorage.getItem("cart");
  if (!cart) {
    emptyCartContainer.classList.toggle("none");
  }
  //   else{

  //   }
};
const logoutUser = () => {
  const url = "http://localhost:3000/user/logout";
  const token = localStorage.getItem("token");

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      else throw new Error(res.status);
    })
    .catch((err) => {
      console.log(err);
    });
};
loadCartInterface();
