import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    super.setOverlayListener((overlayElement) => {
      overlayElement.addEventListener("click", () => super.close());
    })
  }
  open(imageUrl, imageName) {
    super.populatePopup((popup) => {
      const formSection = popup;
      const formPic = formSection.querySelector(".form__pic");
      formPic.src = imageUrl;
      formPic.alt = `Picture of ${imageName}`;
      formSection.querySelector(".form__pic-name").textContent = imageName;
    });
    super.open();
  }
}
