import { Document } from "./Document.js";

export class Popup {
  constructor(popupSectionElement) {
    this._doc = new Document();
    this._config = this._doc.getConfig();
    this._popupSectionElement = popupSectionElement;
    this._formElement = this._doc.getFormElement(popupSectionElement);
    this._closeButton = this._doc.getCloseButton(this._formElement);
  }

  toggleDisplay() {
    this._popupSectionElement.classList.toggle(this._config.getHideClass());
  }

  addCloseEventListener() {
    const handler =  () => {
      this.toggleDisplay();
      this._closeButton.removeEventListener(this._config.getClickEvent(), handler);
    }
    this._closeButton.addEventListener(this._config.getClickEvent(), handler);
  }

  getDoc() { return this._doc; }
  getFormElement() { return this._formElement }
  getInputList() {
    return this._doc.getFormInputList(this.getFormElement());
  }
}

