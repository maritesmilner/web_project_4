export default class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    this._popupForm = this._popup.querySelector(".form");
    this._closeButton = this._popup.querySelector(".form__close-button");
    this._saveButton = this._popup.querySelector(".form__save-button");
    this._overlayElement = this._popup.querySelector(".overlay");
  }

  open() {
    this._popup.classList.toggle("hide");
  }
  close() {
    this._closeButton.removeEventListener("click", this._closeHandler);
    this._popup.classList.toggle("hide");
  }
  setEventListeners() {
    this._closeHandler =  () => {
      this.close();
    }
    this._closeButton.addEventListener("click", this._closeHandler);
  }
  getPopup() {
    return this._popup;
  }
  getPopupForm() {
    return this._popupForm;
  }
  getOverlayElement() {
    return this._overlayElement;
  }
  getCloseButton() {
    return this._closeButton;
  }
  getSaveButton() {
    return this._saveButton;
  }
}
