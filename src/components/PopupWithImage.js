import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._overlayHandler = () => {
      this._close();
    }
  }
  _close() {
    super.getOverlayElement().removeEventListener("click", this._overlayHandler);
    super.close();
  }
  _setEventListeners() {
    super.getOverlayElement().addEventListener("click", this._overlayHandler);
    super.setEventListeners();
  }
  _populatePopup(cardElement) {
    const formSection = super.getPopup();
    const formPic = formSection.querySelector(".form__pic");
    formPic.src = cardElement.querySelector(".place__picture").src;
    formPic.alt = cardElement.querySelector(".place__picture").alt;
    const formPicName = formSection.querySelector(".form__pic-name");
    formPicName.textContent = cardElement.querySelector(".place__name").textContent;
  }
  open(cardElement) {
    this._populatePopup(cardElement);
    this._setEventListeners();
    super.open();
  }

}
