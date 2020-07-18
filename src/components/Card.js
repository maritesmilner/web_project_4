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
  }
  _getCardTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".place")
      .cloneNode(true);
  }
  _setEventListeners() {
    this._card.addEventListener("click", (e) => {
      if (e.target.classList.contains("heart-button")) {
        this._handleLikeEvent(e);
      }
      if (e.target.classList.contains("trash-button")) {
        this._handleDeleteEvent();
      }
      if (e.target.classList.contains("place__picture")) {
        this._handleCardClick(this._card);
      }
    })
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
