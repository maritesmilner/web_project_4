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
  getCloseButton(popupForm) {
    return popupForm.querySelector(this._config.getCloseButtonSelector());
  }
  getConfig() {
    return this._config;
  }
  getEditButton() {
    return this._container.querySelector(this._config.getEditButtonSelector());
  }
  getFormElement(formSectionElement) {
    return formSectionElement.querySelector(this._config.getFormSelector());
  }
  getFormErrorElement(formElement, inputElement) {
    console.log(formElement);
    return formElement.querySelector(`#${inputElement.id}-error`);
  }
  getFormInputList(formElement) {
    return [...formElement.querySelectorAll(this._config.getInputSelector())];
  }
  getFormPic(popupForm) {
    return popupForm.querySelector(this._config.getFormPicSelector());
  }
  getFormSectionElement(selector) {
    return this._container.querySelector(selector);
  }
  getFormOverlayElement(formSectionElement) {
    return formSectionElement.querySelector(this._config.getPageOverlaySelector());
  }
  getFormPlaceName(popupForm) {
    return popupForm.querySelector(this._config.getFormPicNameSelector());
  }
  getFormSaveButtonElement(formElement) {
    return formElement.querySelector(this._config.getFormSaveButtonSelector());
  }
  getNewPlaceButton() { return this._newPlaceButton; }
  getSaveButton(formElement) {
    return formElement.querySelector(this._config.getSubmitAction());
  }
  getPlaceElement(placeElement) {
    return placeElement.querySelector(this._config.getPlaceSelector());
  }
  getPlaceLinkField(formElement) {
    return formElement.querySelector(this._config.getPlaceLinkFieldSelector());
  };
  getPlaceName(placeElement) {
    return placeElement.querySelector(this._config.getPlaceNameSelector());
  }
  getPlacePic(placeElement) {
    return placeElement.querySelector(this._config.getPlacePicSelector());
  }
  getPlaces() {
    return this._places;
  }
  getPlaceTitleField(formElement) {
    return formElement.querySelector(this._config.getPlaceTitleFieldSelector());
  };
  getProfileName() { return this._profileName; }
  getProfileNameField(popupForm) {
    return popupForm.querySelector(this._config.getProfileNameFieldSelector());
  }
  getProfileTitle() { return this._profileTitle; }
  getProfileTitleField(popupForm) {
    return popupForm.querySelector(this._config.getProfileTitleFieldSelector());
  }
  getTemplateElement() {
    return document.getElementById(this._config.getPlaceTemplateId());
  }
}

