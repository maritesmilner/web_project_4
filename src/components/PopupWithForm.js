import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = super.getPopup().querySelector(".form");
  }

  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll(".form__input");
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  resetForm() {
    this._popupForm.reset();
    super.getSaveButton().classList.add("form__save-button_disabled");
    super.getSaveButton().disabled = true;
  }
  _setEventListeners() {
    this._submitHandler = (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    }
    this._popupForm.addEventListener("submit", this._submitHandler);
    super.setEventListeners();
  }
  close() {
    this._popupForm.removeEventListener("submit", this._submitHandler);
    super.close();
  }
  open() {
    this._setEventListeners();
    super.open();
  }
}
