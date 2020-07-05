import { Document } from "./document.js";

export class Popup {
  constructor(popupSectionElement) {
    this._doc = new Document();
    this._config = this._doc.getConfig();
    this._popupSectionElement = popupSectionElement;
    this._popupForm = this._doc.getPopupForm(popupSectionElement);
    this._closeButton = this._doc.getCloseButton(this._popupForm);
    //this._event = event;
  }

  toggleDisplay() {
    this._popupSectionElement.classList.toggle(this._config.getHideClass());
  }

  addCloseEventListener() {
    const listener =  () => {
      this.toggleDisplay();
      this._closeButton.removeEventListener(this._config.getClickEvent(), listener);
    }
    this._closeButton.addEventListener(this._config.getClickEvent(), listener);
  }

  //getters for private fields
  getDoc() { return this._doc; }
  //getEvent() { return this._event; }
  getPopupForm() { return this._popupForm; }

}
