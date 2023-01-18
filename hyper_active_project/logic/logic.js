const contectBtn = document.getElementById("contect-btn");
const logoHeader = document.getElementById("logo");
const iconMenu = document.getElementById("icon-menu");
const careerDiv = document.getElementById("career");
const contectBtnMain = document.getElementById("contect-btn-main");

const diagnosis = document.getElementById("diagnosis");
const training = document.getElementById("training");
const career = document.getElementById("career-work");
const process = document.getElementById("process");

const modalSign = document.getElementById("modal-sign");

const question01 = document.getElementById("question-01");
const question02 = document.getElementById("question-02");
const question03 = document.getElementById("question-03");
const question04 = document.getElementById("question-04");
const question05 = document.getElementById("question-05");
const question06 = document.getElementById("question-06");
const question07 = document.getElementById("question-07");
const question08 = document.getElementById("question-08");
const question09 = document.getElementById("question-09");
const question10 = document.getElementById("question-10");
const question11 = document.getElementById("question-11");
const question12 = document.getElementById("question-12");
const question13 = document.getElementById("question-13");

const publicService01 = document.getElementById("public-service-01");
const publicService02 = document.getElementById("public-service-02");
const publicService03 = document.getElementById("public-service-03");
const publicService04 = document.getElementById("public-service-04");
const publicService05 = document.getElementById("public-service-05");
const publicService06 = document.getElementById("public-service-06");

const careerBottomMobileMenu = document.getElementById(
  "wraper-for-head-and-sign"
);

careerBottomMobileMenu.addEventListener("click", () => {
  const careerMenuMobileList = document.getElementById("career-menu-mobile");
  careerMenuMobileList.classList.toggle("none");
  careerMenuMobileList.classList.toggle("career-menu-mobile");
});

window.addEventListener("load", () => {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.classList.remove("none");
  modalContainer.classList.add("modal-container");
});

modalSign.addEventListener("click", () => {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.className = "none";
});

//----------------------Public Service section----------------------------------\\
publicService01.addEventListener("click", () => {
  const publicAnswer01 = document.getElementById("public-answer-01");
  const arrowButtom01 = document.getElementById("arrow-public-01");

  publicAnswer01.classList.toggle("public-answer");
  publicAnswer01.classList.toggle("custom-none-for-public-answer");
  arrowButtom01.classList.toggle("fa-arrow-circle-down");
  arrowButtom01.classList.toggle("fa-arrow-circle-up");
});

publicService02.addEventListener("click", () => {
  const publicAnswer02 = document.getElementById("public-answer-02");
  const arrowButtom02 = document.getElementById("arrow-public-02");

  publicAnswer02.classList.toggle("public-answer");
  publicAnswer02.classList.toggle("custom-none-for-public-answer");
  arrowButtom02.classList.toggle("fa-arrow-circle-down");
  arrowButtom02.classList.toggle("fa-arrow-circle-up");
});

publicService03.addEventListener("click", () => {
  const publicAnswer03 = document.getElementById("public-answer-03");
  const arrowButtom03 = document.getElementById("arrow-public-03");

  publicAnswer03.classList.toggle("public-answer");
  publicAnswer03.classList.toggle("custom-none-for-public-answer");
  arrowButtom03.classList.toggle("fa-arrow-circle-down");
  arrowButtom03.classList.toggle("fa-arrow-circle-up");
});

publicService04.addEventListener("click", () => {
  const publicAnswer04 = document.getElementById("public-answer-04");
  const arrowButtom04 = document.getElementById("arrow-public-04");

  publicAnswer04.classList.toggle("public-answer");
  publicAnswer04.classList.toggle("custom-none-for-public-answer");
  arrowButtom04.classList.toggle("fa-arrow-circle-down");
  arrowButtom04.classList.toggle("fa-arrow-circle-up");
});

publicService05.addEventListener("click", () => {
  const publicAnswer05 = document.getElementById("public-answer-05");
  const arrowButtom05 = document.getElementById("arrow-public-05");

  publicAnswer05.classList.toggle("public-answer");
  publicAnswer05.classList.toggle("custom-none-for-public-answer");
  arrowButtom05.classList.toggle("fa-arrow-circle-down");
  arrowButtom05.classList.toggle("fa-arrow-circle-up");
});

publicService06.addEventListener("click", () => {
  const publicAnswer06 = document.getElementById("public-answer-06");
  const arrowButtom06 = document.getElementById("arrow-public-06");

  publicAnswer06.classList.toggle("public-answer");
  publicAnswer06.classList.toggle("custom-none-for-public-answer");
  arrowButtom06.classList.toggle("fa-arrow-circle-down");
  arrowButtom06.classList.toggle("fa-arrow-circle-up");
});

//----------------------Q&A section----------------------------------\\
question01.addEventListener("click", () => {
  const answer01 = document.getElementById("answer-01");
  const arrowButtom01 = document.getElementById("arrow-01");

  answer01.classList.toggle("answer");
  answer01.classList.toggle("custom-none-for-answer");
  arrowButtom01.classList.toggle("fa-arrow-circle-down");
  arrowButtom01.classList.toggle("fa-arrow-circle-up");
});

question02.addEventListener("click", () => {
  const answer02 = document.getElementById("answer-02");
  const arrowButtom02 = document.getElementById("arrow-02");

  answer02.classList.toggle("answer");
  answer02.classList.toggle("custom-none-for-answer");
  arrowButtom02.classList.toggle("fa-arrow-circle-down");
  arrowButtom02.classList.toggle("fa-arrow-circle-up");
});

question03.addEventListener("click", () => {
  const answer03 = document.getElementById("answer-03");
  const arrowButtom03 = document.getElementById("arrow-03");

  answer03.classList.toggle("answer");
  answer03.classList.toggle("custom-none-for-answer");
  arrowButtom03.classList.toggle("fa-arrow-circle-down");
  arrowButtom03.classList.toggle("fa-arrow-circle-up");
});

question04.addEventListener("click", () => {
  const answer04 = document.getElementById("answer-04");
  const arrowButtom04 = document.getElementById("arrow-04");

  answer04.classList.toggle("answer");
  answer04.classList.toggle("custom-none-for-answer");
  arrowButtom04.classList.toggle("fa-arrow-circle-down");
  arrowButtom04.classList.toggle("fa-arrow-circle-up");
});

question05.addEventListener("click", () => {
  const answer05 = document.getElementById("answer-05");
  const arrowButtom05 = document.getElementById("arrow-05");

  answer05.classList.toggle("answer");
  answer05.classList.toggle("custom-none-for-answer");
  arrowButtom05.classList.toggle("fa-arrow-circle-down");
  arrowButtom05.classList.toggle("fa-arrow-circle-up");
});

question06.addEventListener("click", () => {
  const answer06 = document.getElementById("answer-06");
  const arrowButtom06 = document.getElementById("arrow-06");

  answer06.classList.toggle("answer");
  answer06.classList.toggle("custom-none-for-answer");
  arrowButtom06.classList.toggle("fa-arrow-circle-down");
  arrowButtom06.classList.toggle("fa-arrow-circle-up");
});

question07.addEventListener("click", () => {
  const answer07 = document.getElementById("answer-07");
  const arrowButtom07 = document.getElementById("arrow-07");

  answer07.classList.toggle("answer");
  answer07.classList.toggle("custom-none-for-answer");
  arrowButtom07.classList.toggle("fa-arrow-circle-down");
  arrowButtom07.classList.toggle("fa-arrow-circle-up");
});

question08.addEventListener("click", () => {
  const answer08 = document.getElementById("answer-08");
  const arrowButtom08 = document.getElementById("arrow-08");

  answer08.classList.toggle("answer");
  answer08.classList.toggle("custom-none-for-answer");
  arrowButtom08.classList.toggle("fa-arrow-circle-down");
  arrowButtom08.classList.toggle("fa-arrow-circle-up");
});

question09.addEventListener("click", () => {
  const answer09 = document.getElementById("answer-09");
  const arrowButtom09 = document.getElementById("arrow-09");

  answer09.classList.toggle("answer");
  answer09.classList.toggle("custom-none-for-answer");
  arrowButtom09.classList.toggle("fa-arrow-circle-down");
  arrowButtom09.classList.toggle("fa-arrow-circle-up");
});

question10.addEventListener("click", () => {
  const answer10 = document.getElementById("answer-10");
  const arrowButtom10 = document.getElementById("arrow-10");

  answer10.classList.toggle("answer");
  answer10.classList.toggle("custom-none-for-answer");
  arrowButtom10.classList.toggle("fa-arrow-circle-down");
  arrowButtom10.classList.toggle("fa-arrow-circle-up");
});

question11.addEventListener("click", () => {
  const answer11 = document.getElementById("answer-11");
  const arrowButtom11 = document.getElementById("arrow-11");

  answer11.classList.toggle("answer");
  answer11.classList.toggle("custom-none-for-answer");
  arrowButtom11.classList.toggle("fa-arrow-circle-down");
  arrowButtom11.classList.toggle("fa-arrow-circle-up");
});

question12.addEventListener("click", () => {
  const answer12 = document.getElementById("answer-12");
  const arrowButtom12 = document.getElementById("arrow-12");

  answer12.classList.toggle("answer");
  answer12.classList.toggle("custom-none-for-answer");
  arrowButtom12.classList.toggle("fa-arrow-circle-down");
  arrowButtom12.classList.toggle("fa-arrow-circle-up");
});

question13.addEventListener("click", () => {
  const answer13 = document.getElementById("answer-13");
  const arrowButtom13 = document.getElementById("arrow-13");

  answer13.classList.toggle("answer");
  answer13.classList.toggle("custom-none-for-answer");
  arrowButtom13.classList.toggle("fa-arrow-circle-down");
  arrowButtom13.classList.toggle("fa-arrow-circle-up");
});

//----------------------How it work section----------------------------------\\
const signProcess = document.getElementById("sign-process");
signProcess.addEventListener("click", () => {
  const contextProcess = document.getElementById("context-process");
  // const signProcess = document.getElementById("sign-process");

  contextProcess.classList.toggle("context-process");
  contextProcess.classList.toggle("custom-none-for-work");
  signProcess.classList.toggle("sign");
});
const signCareer = document.getElementById("sign-career");
signCareer.addEventListener("click", () => {
  const contextCareer = document.getElementById("context-career");

  contextCareer.classList.toggle("context-career");
  contextCareer.classList.toggle("custom-none-for-work");
  signCareer.classList.toggle("sign");
});
const signtraining = document.getElementById("sign-training");
signtraining.addEventListener("click", () => {
  const contextTraining = document.getElementById("context-training");
  const signtraining = document.getElementById("sign-training");

  contextTraining.classList.toggle("context-training");
  contextTraining.classList.toggle("custom-none-for-work");
  signtraining.classList.toggle("sign");
});

const signDiagnos = document.getElementById("sign-diagnos");
signDiagnos.addEventListener("click", () => {
  const contextDiagnos = document.getElementById("context-diagnos");

  contextDiagnos.classList.toggle("context-diagnos");
  contextDiagnos.classList.toggle("custom-none-for-work");
  signDiagnos.classList.toggle("sign");
});

//----------------------Form Main section----------------------------------\\
contectBtnMain.addEventListener("click", () => {
  const nameInputMain = document.getElementById("name-input-main");
  const phoneInputMain = document.getElementById("phone-input-main");
  const emailInputMain = document.getElementById("email-input-main");
  let flag = false;
  if (!IsValidInput(nameInputMain.value)) {
    nameInputMain.setAttribute("placeholder", "נא להזין שם תקין*");
    flag = true;
  }
  if (!IsValidphone(phoneInputMain.value)) {
    phoneInputMain.value = "";
    phoneInputMain.setAttribute("placeholder", "נא להזין מספר טלפון*");
    flag = true;
  }
  if (!IsValidEmail(emailInputMain.value)) {
    emailInputMain.value = "";
    emailInputMain.setAttribute("placeholder", "נא להזין כתובת אימייל*");
    flag = true;
  }

  if (!flag) {
    const modalSendDetailsContainer = document.getElementById(
      "modal-send-details-container"
    );

    modalSendDetailsContainer.classList.toggle("modal-send-details-container");
    modalSendDetailsContainer.classList.toggle("none");
  }
});

const exitBottomModal = document.getElementById("exit-bottom-modal");
exitBottomModal.addEventListener("click", () => {
  const modalSendDetailsContainer = document.getElementById(
    "modal-send-details-container"
  );

  modalSendDetailsContainer.className = "none";
});

//----------------------career options and mobile menu section----------------------------------\\
careerDiv.addEventListener("mouseover", (event) => {
  const careerList = document.getElementById("career-list");
  careerList.classList.add("career-list");
  careerList.classList.remove("none");
});

careerDiv.addEventListener("mouseout", (event) => {
  const careerList = document.getElementById("career-list");
  careerList.classList.remove("career-list");
  careerList.classList.add("none");
});

iconMenu.addEventListener("click", () => {
  onMenuClick();
});

logoHeader.addEventListener("click", () => {
  history.go(-1);
});

//----------------------Form footer section----------------------------------\\
contectBtn.addEventListener("click", () => {
  const nameInput = document.getElementById("name-input");
  const phoneInput = document.getElementById("phone-input");
  const emailInput = document.getElementById("email-input");
  let flag = false;

  if (!IsValidInput(nameInput.value)) {
    nameInput.setAttribute("placeholder", "נא להזין שם תקין*");
    flag = true;
  }
  if (!IsValidphone(phoneInput.value)) {
    phoneInput.value = "";
    phoneInput.setAttribute("placeholder", "נא להזין מספר טלפון*");
    flag = true;
  }
  if (!IsValidEmail(emailInput.value)) {
    emailInput.value = "";
    emailInput.setAttribute("placeholder", "נא להזין כתובת אימייל*");
    flag = true;
  }

  if (!flag) {
    const modalSendDetailsContainer = document.getElementById(
      "modal-send-details-container"
    );

    modalSendDetailsContainer.classList.toggle("modal-send-details-container");
    modalSendDetailsContainer.classList.toggle("none");
  }
});

//----------------------Helper functions----------------------------------\\
function IsValidInput(value) {
  if (value !== "") {
    return true;
  }

  return false;
}

function IsValidphone(value) {
  const regexPhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  if (value.match(regexPhone)) {
    return true;
  }

  return false;
}

function IsValidEmail(value) {
  if (value.match("@[a-z]")) {
    return true;
  }

  return false;
}

function onMenuClick() {
  const mobileMenu = document.getElementById("mobile-menu");
  const lineTop = document.getElementById("line-top");
  const lineMid = document.getElementById("line-mid");
  const lineBottom = document.getElementById("line-bottom");

  // mobileMenu.classList.toggle("open");
  // mobileMenu.classList.toggle("none");
  mobileMenu.classList.toggle("mobile-menu");
  mobileMenu.classList.toggle("custom-none-for-menu-mobile");

  lineTop.classList.toggle("line-top");
  lineMid.classList.toggle("line-mid");
  lineBottom.classList.toggle("line-bottom");
}
