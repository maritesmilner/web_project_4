import { Popup } from "./popup.js";
import { Card } from "./card.js";

export class NewPlacePopup extends Popup {
  constructor(popupSectionElement) {
    super(popupSectionElement);
    this._addSubmitEventListener(this.getFormElement());
  }

  _addSubmitEventListener(formElement) {
    const handler = (e) => {
      e.preventDefault();
      const placeLinkField = this.getDoc().getPlaceLinkField(formElement).value;
      const placeTitleField = this.getDoc().getPlaceTitleField(formElement).value;
      const templateElement = this.getDoc().getTemplateElement();
      const cardObject = new Card(placeTitleField, placeLinkField, templateElement);
      const placesElement = this.getDoc().getPlaces();
      placesElement.prepend(cardObject.getCard());
      this.toggleDisplay();
      formElement.reset();
      formElement.removeEventListener(this._config.getSubmitAction(), handler);
    }
    formElement.addEventListener(this._config.getSubmitAction(), handler);
  }
}
