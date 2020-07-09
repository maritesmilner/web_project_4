export class Card {
  constructor(placeName, imageURL, templateElement) {
    this._placeName = placeName;
    this._imageURL = imageURL;
    this._templateElement = templateElement;
    this._closeHandler;
    this._escapeHandler;
    this._overlayHandler;
    this._formSection = document.querySelector(".place-popup");
    this._overlayElement = this._formSection.querySelector(".overlay");
    this._closeButton = this._formSection.querySelector(".form__close-button")
  }
  _handleLikeEvent(e) {
    e.target.classList.toggle("heart-button_active");
  }
  _handleDeleteEvent(e) {
    e.target.parentElement.remove();
  }
  _handlePopupEvent(e) {
    const placeElement = e.target.parentElement;
    const formPic = this._formSection.querySelector(".form__pic");
    formPic.src = placeElement.querySelector(".place__picture").src;
    formPic.alt = placeElement.querySelector(".place__picture").alt;
    const formPicName = this._formSection.querySelector(".form__pic-name");
    const placeName = placeElement.querySelector(".place__name");
    formPicName.textContent = placeName.textContent;
    this._formSection.classList.toggle("hide");
    this._addCloseEventListener();
    this._addEscapeKeyEventListener();
    this._addOverlayEventListener();
  }
  _addCloseEventListener() {
    this._closeHandler = () => {
      this._formSection.classList.toggle("hide");
      this._removeEventListeners();
    };
    this._closeButton.addEventListener("click", this._closeHandler);
  }
  _addEscapeKeyEventListener() {
    this._escapeHandler = (e) => {
      if (e.key === "Escape") {
        this._formSection.classList.toggle("hide");
        this._removeEventListeners();
      }
    }
    document.addEventListener("keyup", this._escapeHandler);
  }
  _addOverlayEventListener() {
    this._overlayHandler = () => {
      this._formSection.classList.toggle("hide");
      this._removeEventListeners();
    }
    this._overlayElement.addEventListener("click", this._overlayHandler);
  }
  _removeEventListeners() {
    this._closeButton.removeEventListener("click", this._closeHandler);
    document.removeEventListener("keyup", this._escapeHandler);
    this._overlayElement.removeEventListener("click", this._overlayHandler);
  }
  _setCard () {
    const placeTemplate = this._templateElement.content.cloneNode(true);
    const newPlace = placeTemplate.querySelector(".place");
    const placePic = newPlace.querySelector(".place__picture");
    placePic.src = this._imageURL;
    placePic.alt = `Picture of ${this._placeName}`;
    newPlace.querySelector(".place__name").textContent = this._placeName;
    newPlace.addEventListener("click", (e) => {
      if (e.target.classList.contains("heart-button")) {
        this._handleLikeEvent(e);
      }
      else if (e.target.classList.contains("trash-button")) {
        this._handleDeleteEvent(e);
      }
      else if (e.target.classList.contains("place__picture")) {
        this._handlePopupEvent(e);
      }
    })
    return newPlace;
  }
  getCard() {
    return this._setCard();
  }
}
