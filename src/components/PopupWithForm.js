import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {callback1 = null, callback2 = null}) {
    super(popupSelector);
    this._handleFormSubmit = callback1;
    this._callback2 = callback2;
    super.setFormListener((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        super.setSaveButtonTxt((button) => button.textContent = "Saving...");
        super.getFormFieldValues((form) => {
          this._handleFormSubmit(this._getInputValues(form))
          .then((res) => {
            this._callback2(res);
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
  setCallbacks({callback1, callback2}) {
    this._handleFormSubmit = callback1;
    this._callback2 = callback2;
  }
}
