import { Popup } from "./Popup.js";
import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";

export class NewPlacePopup extends Popup {
  constructor(popupSectionElement) {
    super(popupSectionElement);
    this._addSubmitEventListener();
    if (!this.getAddHandler()) {
      this._addAddEventListener();
    }
  }
  display() {
    this._addSubmitEventListener()
    this.addCloseEventListener();
    this.toggleDisplay();
  }

  _addAddEventListener() {
    this.setAddHandler(() => {
      const validator = new FormValidator();
      validator.enableValidation({
        formObject: this,
        saveButtonElement: this.getSaveButtonElement(),
        inactiveButtonClass: this.getConfig().getInactiveSaveButtonClass(),
        inputErrorClass: this.getConfig().getInputErrorIndicatorClass(),
        errorClass: this.getConfig().getInputErrorMsgClass()
      });
      this.display();
    })
    this.getDoc().getAddButton().addEventListener(this.getConfig().getClickEvent(), this.getAddHandler());
  }

  _addSubmitEventListener() {
    const formElement = this.getFormElement();
    this.setSubmitHandler((e) => {
      e.preventDefault();
      const placeLinkField = this.getDoc().getPlaceLinkField(formElement).value;
      const placeTitleField = this.getDoc().getPlaceTitleField(formElement).value;
      const templateElement = this.getDoc().getTemplateElement();
      const cardObject = new Card(placeTitleField, placeLinkField, templateElement);
      const placesElement = this.getDoc().getPlaces();
      placesElement.prepend(cardObject.getCard());
      this.toggleDisplay();
      formElement.reset();
      this.removeEventListeners();
      this.getSaveButtonElement().classList.add(this.getConfig().getInactiveSaveButtonClass());
      this.getSaveButtonElement().disabled = true;
    });
    formElement.addEventListener(this.getConfig().getSubmitAction(), this.getSubmitHandler());
  }
}
