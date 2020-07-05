import {Config} from "./config.js";

export class Document {
  constructor() {
    if(Document._instance) return Document._instance;
    this._config = new Config();
    this._container = document.querySelector(this._config.getContainerSelector());
    this._places = this._container.querySelector(this._config.getPlacesSelector());
    this._profileName = this._container.querySelector(this._config.getProfileNameSelector());
    this._profileTitle = this._container.querySelector(this._config.getProfileTitleSelector());
    this._templateElement = document.getElementById(this._config.getPlaceTemplateId());
    this._editButton = this._container.querySelector(this._config.getEditButtonSelector());
    this._newPlaceButton = this._container.querySelector(this._config.getAddButtonSelector());
    Document._instance = this;
  }
  getNewPlaceButton() { return this._newPlaceButton; }
  getFormSectionElement(selector) {
    return this._container.querySelector(selector);
  }
  getEditButton() { return this._editButton; }
  getProfileName() { return this._profileName; }
  getProfileTitle() { return this._profileTitle; }
  getProfileTitleField(popupForm) {
    return popupForm.querySelector(this._config.getProfileTitleFieldSelector());
  }
  getProfileNameField(popupForm) {
    return popupForm.querySelector(this._config.getProfileNameFieldSelector());
  }

  getCloseButton(popupForm) {
    return popupForm.querySelector(this._config.getCloseButtonSelector());
  }
  getConfig() {
    return this._config;
  }
  getPlaces() {
    return this._places;
  }
  getPopupForm(popupSectionElement) {
    return popupSectionElement.querySelector(this._config.getFormSelector());
  }
  getTemplateElement() {
    return this._templateElement;
  }
  getFormPic(popupForm) {
    return popupForm.querySelector(this._config.getFormPicSelector());
  }
  getFormPlaceName(popupForm) {
    return popupForm.querySelector(this._config.getFormPicNameSelector());
  }
  getPlacePic(placeElement) {
    return placeElement.querySelector(this._config.getPlacePicSelector());
  }
  getPlaceName(placeElement) {
    return placeElement.querySelector(this._config.getPlaceNameSelector());
  }
}

