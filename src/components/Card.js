export default class Card {
  constructor({ likes, _id, name, link, owner },
    templateSelector, { handleCardClick, confirmDelete, handleAddLike, handleRemoveLike }, userId) {
    this._placeName = name;
    this._imageURL = link;
    this._likes = likes;
    this._id = _id;
    this._owner = owner;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = confirmDelete;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
    userId ? this._userId = userId : this._userId = this._owner._id;
    this._card = this._setCardElement();
  }
  _toggleLike() {
    this._likeButtonElement.classList.toggle("like__button_active");
  }
  _isLiked() {
    this._likes.some((like) => like._id === this._userId) ?
      this._toggleLike() : "";
  }
  _setLikeCount(likeCount) {
    this._likeCount = likeCount;
    this._likeCountElement.textContent = likeCount;
  }
  _getCardTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".place")
      .cloneNode(true);
  }
  _removeCardLike(callback) {
    this._handleRemoveLike(this._id)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  _addCardLike(callback) {
    this._handleAddLike(this._id)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  _handleLikeEvent() {
    const handleResponse = ({likes}) => {
      this._likes = likes;
      this._setLikeCount(likes.length);
      this._toggleLike();
    }
    this._likeButtonElement.classList.contains("like__button_active") ?
      this._removeCardLike(handleResponse) :
      this._addCardLike(handleResponse);
  }
  _setEventListeners() {
    this._likeButtonElement.addEventListener(
      "click",
      () => { this._handleLikeEvent(); }
    );
    this._trashButtonElement.addEventListener(
      "click",
      () => { this._handleCardDelete(this); }
    );
    this._card.querySelector(".place__picture").addEventListener(
      "click",
      () => { this._handleCardClick(this._imageURL, this._placeName); }
    );
  }
  _setCardElement() {
    this._card = this._getCardTemplate();
    const placePic = this._card.querySelector(".place__picture");
    placePic.src = this._imageURL;
    placePic.alt = `Picture of ${this._placeName}`;
    this._card.querySelector(".place__name").textContent = this._placeName;
    this._likeCountElement = this._card.querySelector(".like__count");
    this._likeButtonElement = this._card.querySelector(".like__button");
    this._trashButtonElement = this._card.querySelector(".trash-button")
    this._setLikeCount(this._likes.length);
    if (this._likeCount > 0 ) {
      this._isLiked();
    }
    if (this._owner._id !== this._userId) {
      this._trashButtonElement.classList.add("hide");
    }
    this._setEventListeners();
    return this._card;
  }
  getCardElement() {
    return this._card;
  }
  getId() {
    return this._id;
  }
  remove(){
    this._card.remove();
    this._card = null;
  }
}
