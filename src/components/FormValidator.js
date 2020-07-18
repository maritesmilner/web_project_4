export default class FormValidator {
  constructor ({submitButtonSelector, inputSelector, inputErrorClass,
      errorClass, inactiveButtonClass}, formElement) {
    this._formElement = formElement;
    this._submitButtonElement = this._formElement.querySelector(submitButtonSelector);
    this._inputSelector = inputSelector;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._inactiveButtonClass = inactiveButtonClass
  }
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _toggleSubmitButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._submitButtonElement.classList.add(this._inactiveButtonClass);
      this._submitButtonElement.disabled = true;
    } else {
      this._submitButtonElement.classList.remove(this._inactiveButtonClass);
      this._submitButtonElement.disabled = false;
    }
  }
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }
  enableValidation() {
    const inputList = [...this._formElement.querySelectorAll(this._inputSelector)];
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleSubmitButtonState(inputList);
      });
    });
  }
}
