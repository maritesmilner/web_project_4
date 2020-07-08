import { Document } from "./Document.js";

export class FormValidator {
  constructor () {
    if(FormValidator._instance) return FormValidator._instance;
    this._doc = new Document();
    this._config = this._doc.getConfig();
    FormValidator._instance = this;
  }
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _toggleSubmitButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
  _hideInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
    const errorElement = this._doc.getFormErrorElement(formElement, inputElement);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  }
  _showInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
    const errorElement = this._doc.getFormErrorElement(formElement, inputElement);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  _checkInputValidity(formElement, inputElement, rest) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, rest);
    } else {
      this._hideInputError(formElement, inputElement, rest);
    }
  }
  enableValidation({formObject, inactiveButtonClass, saveButtonElement, ...rest}) {
    const inputList = formObject.getInputList();
    const formElement = formObject.getFormElement();
    inputList.forEach((inputElement) => {
      inputElement.addEventListener(this._config.getInputEvent(), () => {
        this._checkInputValidity(formElement, inputElement, rest);
        this._toggleSubmitButtonState(inputList, saveButtonElement, inactiveButtonClass);
      });
    });
  }
}
