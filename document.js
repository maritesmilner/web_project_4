import {Config} from "./Config.js";

export class Document {
  constructor() {
    if(Document._instance) return Document._instance;
    this._config = new Config();
    this._container = document.querySelector(this._config.getContainerSelector());
    this._places = this._container.querySelector(this._config.getPlacesSelector());
    this._profileName = this._container.querySelector(this._config.getProfileNameSelector());
    this._profileTitle = this._container.querySelector(this._config.getProfileTitleSelector());
    Document._instance = this;
  }

  getAddButton() {
    return this._container.querySelector(this._config.getAddButtonSelector());
  }
  getEditButton() {
    return this._container.querySelector(this._config.getEditButtonSelector());
  }
  getFormErrorElement(formElement, inputElement) {
    console.log(formElement);
    return formElement.querySelector(`#${inputElement.id}-error`);
  }
  getFormSaveButtonElement(formElement) {
    return formElement.querySelector(this._config.getFormSaveButtonSelector());
  }

  getFormInputList(formElement) {
    return [...formElement.querySelectorAll(this._config.getInputSelector())];
  }
  getSaveButton(formElement) {
    return formElement.querySelector(this._config.getSubmitAction());
  }

  getNewPlaceButton() { return this._newPlaceButton; }
  getFormSectionElement(selector) {
    return this._container.querySelector(selector);
  }

  getPlaceLinkField(formElement) {
    return formElement.querySelector(this._config.getPlaceLinkFieldSelector());
  };
  getPlaceTitleField(formElement) {
    return formElement.querySelector(this._config.getPlaceTitleFieldSelector());
  };

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
  getFormElement(formSectionElement) {
    return formSectionElement.querySelector(this._config.getFormSelector());
  }
  getTemplateElement() {
    return document.getElementById(this._config.getPlaceTemplateId());
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

