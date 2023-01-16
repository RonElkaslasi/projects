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
const modalContainer = document.getElementById("modal-container");
const modalSign = document.getElementById("modal-sign");
const mainContainer = document.getElementById("main-container");
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

window.addEventListener("load", () => {
  modalContainer.classList.remove("none");
  modalContainer.classList.add("modal-container");
});

modalSign.addEventListener("click", () => {
  modalContainer.className = "none";
});
publicService01.addEventListener("click", () => {
  const publicAnswer01 = document.getElementById("public-answer-01");
  publicAnswer01.classList.toggle("public-answer");
});

publicService02.addEventListener("click", () => {
  const publicAnswer02 = document.getElementById("public-answer-02");
  publicAnswer02.classList.toggle("public-answer");
});

publicService03.addEventListener("click", () => {
  const publicAnswer03 = document.getElementById("public-answer-03");
  publicAnswer03.classList.toggle("public-answer");
});
publicService04.addEventListener("click", () => {
  const publicAnswer04 = document.getElementById("public-answer-04");
  publicAnswer04.classList.toggle("public-answer");
});
publicService05.addEventListener("click", () => {
  const publicAnswer05 = document.getElementById("public-answer-05");
  publicAnswer05.classList.toggle("public-answer");
});
publicService06.addEventListener("click", () => {
  const publicAnswer06 = document.getElementById("public-answer-06");
  publicAnswer06.classList.toggle("public-answer");
});

question01.addEventListener("click", () => {
  const answer01 = document.getElementById("answer-01");
  answer01.classList.toggle("answer");
  answer01.classList.toggle("none");
});
question02.addEventListener("click", () => {
  const answer02 = document.getElementById("answer-02");
  answer02.classList.toggle("answer");
  answer02.classList.toggle("none");
});
question03.addEventListener("click", () => {
  const answer03 = document.getElementById("answer-03");
  answer03.classList.toggle("answer");
  answer03.classList.toggle("none");
});
question04.addEventListener("click", () => {
  const answer04 = document.getElementById("answer-04");
  answer04.classList.toggle("answer");
  answer04.classList.toggle("none");
});
question05.addEventListener("click", () => {
  const answer05 = document.getElementById("answer-05");
  answer05.classList.toggle("answer");
  answer05.classList.toggle("none");
});
question06.addEventListener("click", () => {
  const answer06 = document.getElementById("answer-06");
  answer06.classList.toggle("answer");
  answer06.classList.toggle("none");
});
question07.addEventListener("click", () => {
  const answer07 = document.getElementById("answer-07");
  answer07.classList.toggle("answer");
  answer07.classList.toggle("none");
});
question08.addEventListener("click", () => {
  const answer08 = document.getElementById("answer-08");
  answer08.classList.toggle("answer");
  answer08.classList.toggle("none");
});
question09.addEventListener("click", () => {
  const answer09 = document.getElementById("answer-09");
  answer09.classList.toggle("answer");
  answer09.classList.toggle("none");
});
question10.addEventListener("click", () => {
  const answer10 = document.getElementById("answer-10");
  answer10.classList.toggle("answer");
  answer10.classList.toggle("none");
});
question11.addEventListener("click", () => {
  const answer11 = document.getElementById("answer-11");
  answer11.classList.toggle("answer");
  answer11.classList.toggle("none");
});
question12.addEventListener("click", () => {
  const answer12 = document.getElementById("answer-12");
  answer12.classList.toggle("answer");
  answer12.classList.toggle("none");
});
question13.addEventListener("click", () => {
  const answer13 = document.getElementById("answer-13");
  answer13.classList.toggle("answer");
  answer13.classList.toggle("none");
});

process.addEventListener("click", () => {
  const contextProcess = document.getElementById("context-process");
  const lineTopProcess = document.getElementById("line-top-process");
  const lineBottomProcess = document.getElementById("line-bottom-process");

  contextProcess.classList.toggle("context-process");
  lineTopProcess.classList.toggle("line-top-sign");
  lineBottomProcess.classList.toggle("line-bottom-sign");
});

career.addEventListener("click", () => {
  const contextCareer = document.getElementById("context-career");
  const lineTopCareer = document.getElementById("line-top-career");
  const lineBottomCareer = document.getElementById("line-bottom-career");

  contextCareer.classList.toggle("context-career");
  lineTopCareer.classList.toggle("line-top-sign");
  lineBottomCareer.classList.toggle("line-bottom-sign");
});

training.addEventListener("click", () => {
  const contextTraining = document.getElementById("context-training");
  const lineTopTraining = document.getElementById("line-top-training");
  const lineBottomTraining = document.getElementById("line-bottom-training");

  contextTraining.classList.toggle("context-training");
  lineTopTraining.classList.toggle("line-top-sign");
  lineBottomTraining.classList.toggle("line-bottom-sign");
});

diagnosis.addEventListener("click", () => {
  const contextDiagnos = document.getElementById("context-diagnos");
  const lineTopDiagnos = document.getElementById("line-top-diagnos");
  const lineBottomDiagnos = document.getElementById("lin-bottom-diagnos");

  contextDiagnos.classList.toggle("context-diagnos");
  lineTopDiagnos.classList.toggle("line-top-sign");
  lineBottomDiagnos.classList.toggle("line-bottom-sign");
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
