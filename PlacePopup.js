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
    this.addCloseEventListener();
    this.toggleDisplay();
  }
}
