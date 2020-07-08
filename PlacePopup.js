import { Popup } from "./Popup.js";

export class PlacePopup extends Popup {
  constructor(popupSectionElement, event) {
    super(popupSectionElement);
    this._event = event;
  }

  display() {
    const place = this._event.target.parentElement;
    const formPic = this.getDoc().getFormPic(this.getFormElement());
    const formPlace = this.getDoc().getFormPlaceName(this.getFormElement())
    formPic.src = this.getDoc().getPlacePic(place).src;
    formPic.alt = this.getDoc().getPlacePic(place).alt;
    formPlace.textContent = this.getDoc().getPlaceName(place).textContent;
    this._addEscapeKeyEventListener();
    this._addOverlayEventListener();
    this.addCloseEventListener();
    this.toggleDisplay();
  }

  _addEscapeKeyEventListener() {
    this._escapeHandler = (e) => {
      if (e.key === this.getConfig().getEscapeKey()) {
        this.toggleDisplay();
        this.removeEventListeners();
      }
    }
    document.addEventListener(this.getConfig().getKeyUpEvent(), this._escapeHandler);
  }
  _addOverlayEventListener() {
    this._overlayHandler = (e) => {
      this.toggleDisplay();
      this.removeEventListeners();
    }
    this._overlayElement.addEventListener(this.getConfig().getClickEvent(), this._overlayHandler);

  }
}
