const nameInput = document.getElementById("name-input");
const phoneInput = document.getElementById("phone-input");
const emailInput = document.getElementById("email-input");
const contectBtn = document.getElementById("contect-btn");
const logoHeader = document.getElementById("logo");
const iconMenu = document.getElementById("icon-menu");
const mobileMenu = document.getElementById("mobile-menu");
const lineTop = document.getElementById("line-top");
const lineMid = document.getElementById("line-mid");
const lineBottom = document.getElementById("line-bottom");
const careerDiv = document.getElementById("career");
const careerList = document.getElementById("career-list");
const contectBtnMain = document.getElementById("contect-btn-main");

const diagnosis = document.getElementById("diagnosis");
const training = document.getElementById("training");
const career = document.getElementById("career-work");
const process = document.getElementById("process");

process.addEventListener("click", () => {
  const contextProcess = document.getElementById("context-process");
  contextProcess.classList.toggle("context-process");
});

career.addEventListener("click", () => {
  const contextCareer = document.getElementById("context-career");
  contextCareer.classList.toggle("context-career");
});

training.addEventListener("click", () => {
  const contextTraining = document.getElementById("context-training");
  contextTraining.classList.toggle("context-training");
});

diagnosis.addEventListener("click", () => {
  const contextDiagnos = document.getElementById("context-diagnos");
  contextDiagnos.classList.toggle("context-diagnos");
});

contectBtnMain.addEventListener("click", () => {
  const nameInputMain = document.getElementById("name-input-main");
  const phoneInputMain = document.getElementById("phone-input-main");
  const emailInputMain = document.getElementById("email-input-main");

  if (!IsValidInput(nameInputMain.value)) {
    nameInputMain.setAttribute("placeholder", "נא להזין שם תקין*");
  }
  if (!IsValidInput(phoneInputMain.value)) {
    phoneInputMain.setAttribute("placeholder", "נא להזין מספר טלפון*");
  }
  if (!IsValidInput(emailInputMain.value)) {
    emailInputMain.setAttribute("placeholder", "נא להזין כתובת אימייל*");
  }
});

careerDiv.addEventListener("mouseover", (event) => {
  careerList.classList.add("career-list");
  careerList.classList.remove("none");
});

careerDiv.addEventListener("mouseout", (event) => {
  careerList.classList.remove("career-list");
  careerList.classList.add("none");
});

iconMenu.addEventListener("click", () => {
  onMenuClick();
});

logoHeader.addEventListener("click", () => {
  history.go(-1);
});

contectBtn.addEventListener("click", () => {
  if (!IsValidInput(nameInput.value)) {
    nameInput.setAttribute("placeholder", "נא להזין שם תקין*");
  }
  if (!IsValidInput(phoneInput.value)) {
    phoneInput.setAttribute("placeholder", "נא להזין מספר טלפון*");
  }
  if (!IsValidInput(emailInput.value)) {
    emailInput.setAttribute("placeholder", "נא להזין כתובת אימייל*");
  }
});

function IsValidInput(value) {
  if (value !== "") {
    return true;
  }

  return false;
}

function onMenuClick() {
  mobileMenu.classList.toggle("open");
  mobileMenu.classList.toggle("none");
  lineTop.classList.toggle("line-top");
  lineMid.classList.toggle("line-mid");
  lineBottom.classList.toggle("line-bottom");
}
