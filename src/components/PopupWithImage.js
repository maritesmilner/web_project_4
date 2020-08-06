import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._overlayElement.addEventListener("click", () => super.close());
  }
  open(imageUrl, imageName) {
    const formPic = this._popup.querySelector(".form__pic");
    formPic.src = imageUrl;
    formPic.alt = `Picture of ${imageName}`;
    this._popup.querySelector(".form__pic-name").textContent = imageName;
    super.open();
  }
}
