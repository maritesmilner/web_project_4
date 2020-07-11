import { displayPlacePopup } from "./util.js";
export class Card {
  constructor(placeName, imageURL, templateId) {
    this._placeName = placeName;
    this._imageURL = imageURL;
    this._templateId = templateId;
    this._card = this._setCard();
  }
  _handleLikeEvent(e) {
    e.target.classList.toggle("heart-button_active");
  }
  _handleDeleteEvent(e) {
    e.target.parentElement.remove();
  }
  _setCard () {
    console.log(this._templateId);
    const templateElement = document.getElementById(this._templateId);
    console.log(templateElement);
    const placeTemplate = templateElement.content.cloneNode(true);
    const newPlace = placeTemplate.querySelector(".place");
    const placePic = newPlace.querySelector(".place__picture");
    placePic.src = this._imageURL;
    placePic.alt = `Picture of ${this._placeName}`;
    newPlace.querySelector(".place__name").textContent = this._placeName;
    newPlace.addEventListener("click", (e) => {
      if (e.target.classList.contains("heart-button")) {
        this._handleLikeEvent(e);
      }
      if (e.target.classList.contains("trash-button")) {
        this._handleDeleteEvent(e);
      }
      if (e.target.classList.contains("place__picture")) {
        displayPlacePopup(e);
      }
    })
    return newPlace;
  }
  getCard() {
    return this._card;
  }
}
