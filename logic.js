const contectBtn = document.getElementById("contect-btn");
const nameInput = document.getElementById("name-input");
const phoneInput = document.getElementById("phone-input");
const emailInput = document.getElementById("email-input");

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
