import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(
    { promise, callback },
    { popupSelector, saveButtonEnabledFlag = false }
  ){
    super(popupSelector);
    this._handleFormSubmit = promise;
    this._callback = callback;
    this._saveButtonEnabledFlag = saveButtonEnabledFlag;
    this._inputList = this._form.querySelectorAll(".form__input");
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._saveButton.textContent = "Saving...";
      this._handleFormSubmit(this._getInputValues())
        .then((res) => this._callback(res))
        .catch((err) => console.log(err))
        .finally(() => this.close());
    });
  }
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }
  _enableSaveButton() {
    this._saveButton.classList.remove("form__save-button_disabled");
    this._saveButton.disabled = false;
  }
  open() {
    if (this._saveButtonEnabledFlag)
      this._enableSaveButton();
    super.open();
  }
  close() {
    this._form.reset();
    this._saveButton.textContent = this._saveButtonOrigTxt;
    this._saveButton.classList.add("form__save-button_disabled");
    this._saveButton.disabled = true;
    super.close();
  }
  setCallbacks({ promise, callback }) {
    this._handleFormSubmit = promise;
    this._callback = callback;
  }
  setInputValues(defaultValueObject) {
    const fieldsValueMap = new Map(Object.entries(defaultValueObject));
    this._inputList.forEach(input => {
      input.value = fieldsValueMap.get(input.name);
    });
  }
}
