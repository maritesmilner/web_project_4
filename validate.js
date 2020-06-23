const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error-indicator");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error-msg");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  console.log(`#${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error-indicator");
  errorElement.classList.remove("form__input-error-msg");
  errorElement.textContent = "";
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form__save-button_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("form__save-button_disabled");
    buttonElement.disabled = false;
  }
};

//Set event listeners for each form element
const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(".form__input"));
  const submitButton = form.querySelector(".form__save-button");
  toggleButtonState(inputList, submitButton);
  const closeButton = form.querySelector('.form__close-button')
  closeButton.addEventListener('click', () => toggleDisplay(form.parentElement));
  const openButton = document.getElementById(form.id).elements["open-button"];
  openButton.addEventListener('click', () => toggleDisplay(form.parentElement));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(form, inputElement);
      toggleButtonState(inputList, submitButton);
    });
  });
};

const enableValidation = (inputSelector, submitButtonSelector, ...rest) => {
  const formList = [...document.forms];
  formList.forEach((form) => {
    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
      if (form.id === "edit-profile") {
        processEditProfile(form);
      } else if (form.id === "new-place") {
        processNewPlace(form);
      }
      form.reset();
      toggleDisplay(form.parentElement);
      const inputList = [...form.querySelectorAll(inputSelector)];
      const submitButton = form.querySelector(submitButtonSelector);
      toggleButtonState(inputList, submitButton);
    });
    setEventListeners(form);
  });
};

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
});
