import {Config} from "./config.js";
import {PlacePopup} from "./place-popup.js";

export class Card {
  constructor(placeName, imageURL, templateElement) {
    this._placeName = placeName;
    this._imageURL = imageURL;
    this._templateElement = templateElement;
    this._config = new Config();
  }
  _handleLikeEvent(e) {
    e.target.classList.toggle(this._config.getLikeButtonActiveClass());
  }
  _handleDeleteEvent(e) {
    e.target.parentElement.remove();
  }
  _handlePopupEvent(e) {
    const popup = new PlacePopup(document.querySelector(this._config.getPlacePopupSelector()), e);
    popup.display();
  }
  _setCard () {
    const newPlace = this._templateElement.content.cloneNode(true);
    const placePic = newPlace.querySelector(this._config.getPlacePicSelector());
    placePic.src = this._imageURL;
    placePic.alt = `Picture of ${this._placeName}`;
    newPlace.querySelector(this._config.getPlaceNameSelector()).textContent = this._placeName;
    const place = newPlace.querySelector(this._config.getPlaceSelector());
    place.addEventListener(this._config.getClickEvent(), (e) => {
      if (e.target.classList.contains(this._config.getLikeButtonClass())) {
        this._handleLikeEvent(e);
      }
      else if (e.target.classList.contains(this._config.getDeleteButtonClass())) {
        this._handleDeleteEvent(e);
      }
      else if (e.target.classList.contains(this._config.getPlacePicClass())) {
        this._handlePopupEvent(e);
      }
    })
    return newPlace;
  }

  getCard() {
    return this._setCard();
  }
}
