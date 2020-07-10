import { Util } from "./Util.js"
export class Card {
  constructor(placeName, imageURL, templateElement) {
    this._placeName = placeName;
    this._imageURL = imageURL;
    this._templateElement = templateElement;
    this._card = this._setCard();
  }
  _handleLikeEvent(e) {
    e.target.classList.toggle("heart-button_active");
  }
  _handleDeleteEvent(e) {
    e.target.parentElement.remove();
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
        new Util().displayPlacePopup(e);
      }
    })
    return newPlace;
  }
  getCard() {
    return this._card;
  }
}
