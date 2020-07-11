import { displayPlacePopup } from "./util.js";
export class Card {
  constructor(placeName, imageURL, templateSelector) {
    this._placeName = placeName;
    this._imageURL = imageURL;
    this._templateSelector = templateSelector;
    this._card = this._setCard();
  }
  _handleLikeEvent(e) {
    e.target.classList.toggle("heart-button_active");
  }
  _handleDeleteEvent() {
    this._card.remove();
  }
  _getCardTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".place")
      .cloneNode(true);
  }
  _setCard() {
    const newPlace = this._getCardTemplate();
    const placePic = newPlace.querySelector(".place__picture");
    placePic.src = this._imageURL;
    placePic.alt = `Picture of ${this._placeName}`;
    newPlace.querySelector(".place__name").textContent = this._placeName;
    newPlace.addEventListener("click", (e) => {
      if (e.target.classList.contains("heart-button")) {
        this._handleLikeEvent(e);
      }
      if (e.target.classList.contains("trash-button")) {
        this._handleDeleteEvent();
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
