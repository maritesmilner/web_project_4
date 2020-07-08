import { Document } from "./Document.js";

export class Popup {
  constructor(popupSectionElement) {
    this._doc = new Document();
    this._config = this._doc.getConfig();
    this._popupSectionElement = popupSectionElement;
    this._formElement = this._doc.getFormElement(popupSectionElement);
    this._closeButton = this._doc.getCloseButton(this._formElement);
    this._saveButton = this._doc.getFormSaveButtonElement(this.getFormElement());
    this._editHandler;
    this._addHandler;
    this._submitHandler;
    this._closeHandler;
    this._escapeHandler;
    this._overlayHandler;
    this._overlayElement = this._doc.getFormOverlayElement(this.getFormSectionElement());
  }
  removeEventListeners() {
    if(this._escapeHandler) {
      document.removeEventListener(this._config.getKeyUpEvent(), this._escapeHandler);
    }
    if(this._overlayHandler) {
      this._overlayElement.removeEventListener(this._config.getClickEvent(), this._overlayHandler);
    }
    if(this._closeHandler) {
      this._closeButton.removeEventListener(this._config.getClickEvent(), this._closeHandler);
    }
    if(this._submitHandler) {
      this.getFormElement().removeEventListener(this._config.getSubmitAction(), this._submitHandler);
    }
  }
  toggleDisplay() {
    this._popupSectionElement.classList.toggle(this._config.getHideClass());
  }
  addCloseEventListener() {
    this._closeHandler =  () => {
      this.toggleDisplay();
      this.removeEventListeners();
    }
    this._closeButton.addEventListener(this._config.getClickEvent(), this._closeHandler);
  }

  setSubmitHandler(handlerFunction) {
    this._submitHandler = handlerFunction;
  }
  getSubmitHandler() {
    return this._submitHandler;
  }
  setEditHandler(handlerFunction) {
    this._editHandler = handlerFunction;
  }
  getEditHandler() {
    return this._editHandler;
  }
  setAddHandler(handlerFunction) {
    this._addHandler = handlerFunction;
  }
  getAddHandler() {
    return this._addHandler;
  }
  getDoc() { return this._doc; }
  getConfig() { return this._config; }
  getFormElement() { return this._formElement }
  getInputList() {
    return this._doc.getFormInputList(this.getFormElement());
  }
  getFormSectionElement() { return this._popupSectionElement; }
  getSaveButtonElement() { return this._saveButton; }
}

