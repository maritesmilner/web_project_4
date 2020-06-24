const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const showInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = inputElement.validationMessage;
};

const checkInputValidity = (formElement, inputElement, rest) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, rest);
  } else {
    hideInputError(formElement, inputElement, rest);
  }
};

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, closeButtonSelector,
  placeDisplayClass, inactiveButtonClass, ...rest}) => {
  const formList = [...document.querySelectorAll(formSelector)];
  const forms = formList.filter((f) => !f.classList.contains(placeDisplayClass));
  forms.forEach((form) => {
    const submitButton = form.querySelector(submitButtonSelector);
    const inputList = [...form.querySelectorAll(inputSelector)];
    toggleButtonState(inputList, submitButton, inactiveButtonClass);
    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
      processForm(form);
      toggleButtonState(inputList, submitButton, inactiveButtonClass);
    });
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(form, inputElement, rest);
        toggleButtonState(inputList, submitButton, inactiveButtonClass);
      });
    });
  });
};

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  placeDisplayClass: "form_display_pic",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__input_type_error-indicator",
  errorClass: "form__input-error-msg"
});
