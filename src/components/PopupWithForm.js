import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = super.getPopupForm().querySelectorAll(".form__input");
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _resetForm() {
    super.getPopupForm().reset();
    super.getSaveButton().classList.add("form__save-button_disabled");
    super.getSaveButton().disabled = true;
  }
  _setEventListeners() {
    this._closeHandler =  () => {
      this._close();
    }
    super.getCloseButton().addEventListener("click", this._closeHandler);

    this._submitHandler = (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._close();
      this._resetForm();
    }
    super.getPopupForm().addEventListener("submit", this._submitHandler);
  }
  _close() {
    super.getPopupForm().removeEventListener("submit", this._submitHandler);
    super.close();
  }
  open() {
    this._setEventListeners();
    super.open();
  }
}
