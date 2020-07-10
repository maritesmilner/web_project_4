//stop gap, to be converted into PlacePopup class in the next project
export class Util {
  constructor() {
    this._formSection = document.querySelector(".place-popup");
    this._closeButton = this._formSection.querySelector(".form__close-button")
    this._overlayElement = this._formSection.querySelector(".overlay");
    this._closeHandler = () => {
      this._formSection.classList.toggle("hide");
      this._removeEventListeners();
    };
    this._escapeHandler = (e) => {
      if (e.key === "Escape") {
        this._formSection.classList.toggle("hide");
        this._removeEventListeners();
      }
    };
    this._overlayHandler = () => {
      this._formSection.classList.toggle("hide");
      this._removeEventListeners();
    };
  }
  _removeEventListeners() {
    this._closeButton.removeEventListener("click", this._closeHandler);
    document.removeEventListener("keyup", this._escapeHandler);
    this._overlayElement.removeEventListener("click", this._overlayHandler);
  }
   displayPlacePopup(e) {
    const placeElement = e.target.parentElement;
    const formPic = this._formSection.querySelector(".form__pic");
    formPic.src = placeElement.querySelector(".place__picture").src;
    formPic.alt = placeElement.querySelector(".place__picture").alt;
    const formPicName = this._formSection.querySelector(".form__pic-name");
    const placeName = placeElement.querySelector(".place__name");
    formPicName.textContent = placeName.textContent;
    this._formSection.classList.toggle("hide");
    this._closeButton.addEventListener("click", this._closeHandler);
    this._overlayElement.addEventListener("click", this._overlayHandler);
    document.addEventListener("keyup", this._escapeHandler);
  }
}




