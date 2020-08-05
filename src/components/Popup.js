export default class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector(".form")
    this._closeButton = this._popup.querySelector(".form__close-button");
    this._closeButton.addEventListener("click", () => this.close());
    this._saveButton = this._popup.querySelector(".form__save-button");
    if(this._saveButton) {
      this._saveButtonOrigTxt = this._saveButton.textContent;
    }
    this._escapeHandler = (e) => {
      if(e.key === "Escape") {
        this.close();
      }
    }
  }
  open() {
    document.addEventListener("keyup", this._escapeHandler);
    this._popup.classList.toggle("hide");
  }
  close() {
    document.removeEventListener("keyup", this._escapeHandler);
    this._popup.classList.toggle("hide");
  }
  populatePopup(callback) {
    callback(this._popup);
  }
  setOverlayListener(callback) {
    callback(this._popup.querySelector(".overlay"));
  }
  setFormListener(callback) {
    callback(this._form);
  }
  resetForm(callback) {
    callback(this._form, this._saveButton, this._saveButtonOrigTxt);
  }
  setSaveButtonTxt(callback) {
    callback(this._saveButton);
  }
  getFormFieldValues(callback) {
    callback(this._form);
  }
}
