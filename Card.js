import { Document } from "./Document.js";
import { PlacePopup } from "./PlacePopup.js";

export class Card {
  constructor(placeName, imageURL, templateElement) {
    this._placeName = placeName;
    this._imageURL = imageURL;
    this._templateElement = templateElement;
    this._doc = new Document();
    this._config = this._doc.getConfig();
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
    const place = this._templateElement.content.cloneNode(true);
    const newPlace = this._doc.getPlaceElement(place);
    const placePic = this._doc.getPlacePic(newPlace);
    placePic.src = this._imageURL;
    placePic.alt = `Picture of ${this._placeName}`;
    this._doc.getPlaceName(newPlace).textContent = this._placeName;
    newPlace.addEventListener(this._config.getClickEvent(), (e) => {
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
