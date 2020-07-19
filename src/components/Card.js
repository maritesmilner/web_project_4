export default class Card {
  constructor(placeName, imageURL, templateSelector, handleCardClick) {
    this._placeName = placeName;
    this._imageURL = imageURL;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._card = this._setCard();
  }
  _handleLikeEvent(e) {
    e.target.classList.toggle("heart-button_active");
  }
  _handleDeleteEvent() {
    this._card.remove();
    this._card = null;
  }
  _getCardTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".place")
      .cloneNode(true);
  }
  _setEventListeners() {
    this._card.querySelector(".heart-button").addEventListener(
      "click",
      (e) => { this._handleLikeEvent(e); }
    );
    this._card.querySelector(".trash-button").addEventListener(
      "click",
      () => { this._handleDeleteEvent(); }
    );
    this._card.querySelector(".place__picture").addEventListener(
      "click",
      () => { this._handleCardClick(this._card); }
    );
  }
  _setCard() {
    this._card = this._getCardTemplate();
    const placePic = this._card.querySelector(".place__picture");
    placePic.src = this._imageURL;
    placePic.alt = `Picture of ${this._placeName}`;
    this._card.querySelector(".place__name").textContent = this._placeName;
    this._setEventListeners();
    return this._card;
  }
  getCard() {
    return this._card;
  }
}
