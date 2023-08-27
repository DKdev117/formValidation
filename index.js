const userName = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#cpassword");
const form = document.querySelector("#signup");

//shows error message
const showError = (input, message) => {
  //* get the form-field element
  const formField = input.parentElement;
  //? add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  //! show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
};

//?shows success message
const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
};

//checks input field
const isRequired = (value) => (value === "" ? false : true);

//checks length of input field
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

//checks email is valid
const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

//checks password is secured
const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};
//validate username field
const checkUsername = () => {
  let valid = false;
  const min = 3,
    max = 25;
  const usernameVal = userName.value.trim();

  if (!isRequired(usernameVal)) {
    showError(userName, "Username cannot be blank.");
  } else if (!isBetween(usernameVal.length, min, max)) {
    showError(
      userName,
      `Username must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(userName);
    valid = true;
  }
  return valid;
};

//validate email field
const checkEmail = () => {
  let valid = false;
  const emailVal = email.value.trim();
  if (!isRequired(emailVal)) {
    showError(email, "Email cannot be blank.");
  } else if (!isEmailValid(emailVal)) {
    showError(email, "Email is not valid.");
  } else {
    showSuccess(email);
    valid = true;
  }
  return valid;
};

//validate password
const checkPassword = () => {
  let valid = false;

  const passwordVal = password.value.trim();

  if (!isRequired(passwordVal)) {
    showError(password, "Password cannot be blank.");
  } else if (!isPasswordSecure(passwordVal)) {
    showError(
      password,
      "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
    );
  } else {
    showSuccess(password);
    valid = true;
  }

  return valid;
};
//validate confirm password
const checkConfirmPassword = () => {
  let valid = false;
  // check confirm password
  const confirmPasswordVal = confirmPassword.value.trim();
  const passwordVal = password.value.trim();

  if (!isRequired(confirmPasswordVal)) {
    showError(confirmPassword, "Confirm Password is required");
  } else if (passwordVal !== confirmPasswordVal) {
    showError(confirmPassword, "Confirm Password does not match");
  } else {
    showSuccess(confirmPassword);
    valid = true;
  }

  return valid;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isUsernameValid = checkUsername();
  let isEmailValid = checkEmail();
  let isPasswordValid = checkPassword();
  let isConfirmPasswordValid = checkConfirmPassword();

  // let isFormValid =
  //   isUsernameValid &&
  //   isEmailValid &&
  //   isPasswordValid &&
  //   isConfirmPasswordValid;
});
