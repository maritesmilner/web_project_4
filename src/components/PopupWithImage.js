import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(popupSelector, card) {
    super(popupSelector);
    this._card = card;
  }
  _close() {
    super.close();
    document.removeEventListener("keyup", this._escapeHandler);
    super.getOverlayElement().removeEventListener("click", this._overlayHandler);
  }
  _setEventListeners() {
    this._escapeHandler =  (e) => {
      if(e.key === "Escape") {
        this._close();
      }
    }
    document.addEventListener("keyup", this._escapeHandler);

    this._overlayHandler = () => {
      this._close();
    }
    super.getOverlayElement().addEventListener("click", this._overlayHandler);

    this._closeHandler =  () => {
      this._close();
    }
    super.getCloseButton().addEventListener("click", this._closeHandler);
  }
  open() {
    this._setEventListeners();
    super.open();
  }

}