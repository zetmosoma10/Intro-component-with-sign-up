const form = document.querySelector(".form");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const [inputName, inputSurname, inputEmail, inputPassword] = [
  document.getElementById("inputName"),
  document.getElementById("inputSurname"),
  document.getElementById("inputEmail"),
  document.getElementById("inputPassword"),
];
const [iconName, iconSurname, iconEmail, iconPassword] = [
  document.getElementById("nameIcon"),
  document.getElementById("surnameIcon"),
  document.getElementById("emailIcon"),
  document.getElementById("passwordIcon"),
];

const colors = {
  defaultColor: "hsl(246, 25%, 77%)",
  dangerColor: "hsl(0, 100%, 74%)",
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let isValid = true;
  resetValidation();

  // name input empty
  if (inputName.value.trim() === "") {
    isValid = false;
    displayError("errorName", "Name cannot be empty", inputName);
    inputName.classList.add("invalid-input");
    iconName.style.display = "block";
  }

  // surname input empty
  if (inputSurname.value.trim() === "") {
    isValid = false;
    displayError("errorSurname", "Surname cannot be empty", inputSurname);
    inputSurname.classList.add("invalid-input");
    iconSurname.style.display = "block";
  }

  // email input empty or doest pass emailPattern.text()
  if (inputEmail.value.trim() === "") {
    isValid = false;
    displayError("errorEmail", "Email cannot be empty", inputEmail);
    inputEmail.classList.add("invalid-input");
    iconEmail.style.display = "block";
  } else if (!emailPattern.test(inputEmail.value)) {
    isValid = false;
    displayError("errorEmail", "Email is incorrect", inputEmail);
    inputEmail.classList.add("invalid-input");
    iconEmail.style.display = "block";
  }

  // password less than 3 characters
  if (inputPassword.value.length < 3) {
    isValid = false;
    displayError(
      "errorPassword",
      "Password must be at least 4 characters",
      inputPassword
    );
    inputPassword.classList.add("invalid-input");
    iconPassword.style.display = "block";
  }

  // Submit the form (If isValid is True)
  if (isValid) {
    alert(`${inputName.value} your Form submitted successfully!`);
    form.reset();
  }
});

// display error
function displayError(id, message, inputElement) {
  const element = document.getElementById(id);
  element.textContent = message;

  // remove input [borders(red),errorText, dangerIcon ] only IF user corrected the error
  inputElement.addEventListener("blur", () => {
    if (id === "errorName" && inputElement.value.trim() !== "") {
      inputElement.style.borderColor = colors.defaultColor;
      element.textContent = "";
      iconName.style.display = "none";
    } else if (id === "errorSurname" && inputElement.value.trim() !== "") {
      inputElement.style.borderColor = colors.defaultColor;
      element.textContent = "";
      iconSurname.style.display = "none";
    } else if (id === "errorEmail" && emailPattern.test(inputElement.value)) {
      inputElement.style.borderColor = colors.defaultColor;
      element.textContent = "";
      iconEmail.style.display = "none";
    } else if (id === "errorPassword" && inputElement.value.length > 3) {
      inputElement.style.borderColor = colors.defaultColor;
      element.textContent = "";
      iconPassword.style.display = "none";
    }
  });
}

// reset inputs field after submitted
function resetValidation() {
  const inputs = document.querySelectorAll(".input");
  const errorText = document.querySelectorAll(".error");
  const icons = document.querySelectorAll(".icon");

  inputs.forEach((input) => {
    input.classList.remove("invalid-input");
  });

  errorText.forEach((text) => {
    text.textContent = "";
  });

  icons.forEach((icon) => {
    icon.style.display = "none";
  });
}
