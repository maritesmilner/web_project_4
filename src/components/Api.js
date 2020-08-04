import {
  meEntity,
  avatarEntity,
  cardsEntity,
  cardLikesEntity
} from "../utils/constants.js";

export default class Api {
  constructor(baseUrl, options) {
    this._baseUrl = baseUrl;
    this._options = options;
  }

  _getResource(entity) {
    return fetch(`${this._baseUrl}/${entity}`, this._options);
  }

  getMe() {
    this._options.method = "GET";
    return this._getResource(meEntity);
  }

  updateUserInfo(user) {
    this._options.method = "PATCH";
    this._options.body = JSON.stringify(user);
    return this._getResource(meEntity);
  }

  updateUserAvatar(imageLink) {
    this._options.method = "PATCH";
    this._options.body = JSON.stringify({avatar: imageLink});
    return this._getResource(avatarEntity);
  }


  getCards() {
    this._options.method = "GET";
    return this._getResource("cards");
  }

  removeCard(cardId) {
    this._options.method = "DELETE";
    return this._getResource(`${cardsEntity}/${cardId}`);
  }

  addCard(name, link) {
    this._options.method = "POST";
    this._options.body = JSON.stringify({
      name: name,
      link: link
    });
    return this._getResource(cardsEntity);
  }

  addCardLike(cardId) {
    this._options.method = "PUT";
    return this._getResource(`${cardLikesEntity}/${cardId}`);
  }

  removeCardLike(cardId) {
    this._options.method = "DELETE";
    return this._getResource(`${cardLikesEntity}/${cardId}`);
  }

}

