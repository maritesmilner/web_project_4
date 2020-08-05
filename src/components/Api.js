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

  _getDataPromise(entity) {
    return fetch(`${this._baseUrl}/${entity}`, this._options)
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
  }

  getInitialData(callback) {
    Promise.all([
      fetch(`${this._baseUrl}/${meEntity}`, this._options),
      fetch(`${this._baseUrl}/${cardsEntity}`, this._options)
    ]).then((responses) => {
      // Get a JSON object from each of the responses
      return Promise.all(responses.map((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      ));
    }).then((data) => {
      callback(data);
    }).catch((error) => {
      console.log(error);
    });
  }

  updateUserInfo(user) {
    this._options.method = "PATCH";
    this._options.body = JSON.stringify(user);
    return this._getDataPromise(meEntity);
  }

  updateUserAvatar(imageLink) {
    this._options.method = "PATCH";
    this._options.body = JSON.stringify({avatar: imageLink});
    return this._getDataPromise(avatarEntity);
  }

  addCard(name, link) {
    this._options.method = "POST";
    this._options.body = JSON.stringify({
      name: name,
      link: link
    });
    return this._getDataPromise(cardsEntity);
  }

  removeCard(cardId) {
    this._options.method = "DELETE";
    return this._getDataPromise(`${cardsEntity}/${cardId}`);
  }

  addCardLike(cardId) {
    this._options.method = "PUT";
    return this._getDataPromise(`${cardLikesEntity}/${cardId}`);
  }

  removeCardLike(cardId) {
    this._options.method = "DELETE";
    return this._getDataPromise(`${cardLikesEntity}/${cardId}`);
  }
}

