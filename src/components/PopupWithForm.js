import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {promise, callback}) {
    super(popupSelector);
    this._handleFormSubmit = promise;
    this._callback = callback;
    super.setFormListener((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        super.setSaveButtonTxt((button) => button.textContent = "Saving...");
        super.getFormFieldValues((form) => {
          this._handleFormSubmit(this._getInputValues(form))
          .then((res) => {
            this._callback(res);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.close();
          });
        });
      });
    });
  }
  _getInputValues(form) {
    const inputList = form.querySelectorAll(".form__input");
    const formValues = {};
    inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }
  close() {
    super.resetForm((form, saveButton, origText) => {
      form.reset();
      saveButton.textContent = origText;
      saveButton.classList.add("form__save-button_disabled");
      saveButton.disabled = true;
    });
    super.close();
  }
  setHandleFormSubmit(callback) {
    this._handleFormSubmit = callback;
  }
  setCallbacks({promise, callback}) {
    this._handleFormSubmit = promise;
    this._callback = callback;
  }
}
