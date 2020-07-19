export default class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".form__close-button");
    this._saveButton = this._popup.querySelector(".form__save-button");
    this._overlayElement = this._popup.querySelector(".overlay");
    this._closeHandler =  () => {
      this.close();
    }
    this._escapeHandler = (e) => {
      if(e.key === "Escape") {
        this.close();
      }
    }
  }

  open() {
    this._popup.classList.toggle("hide");
  }
  close() {
    this._closeButton.removeEventListener("click", this._closeHandler);
    document.removeEventListener("keyup", this._escapeHandler);
    this._popup.classList.toggle("hide");
  }
  setEventListeners() {
    this._closeButton.addEventListener("click", this._closeHandler);
    document.addEventListener("keyup", this._escapeHandler);
  }
  getPopup() {
    return this._popup;
  }
  getCloseButton() {
    return this._closeButton;
  }
  getSaveButton() {
    return this._saveButton;
  }
  getOverlayElement() {
    return this._overlayElement;
  }
}
