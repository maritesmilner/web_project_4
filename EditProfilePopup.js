import { Popup } from "./Popup.js";
import { FormValidator } from "./FormValidator.js"

export class EditProfilePopup extends Popup {
  constructor(popupSectionElement) {
    super(popupSectionElement);
    this._profileName = this.getDoc().getProfileName();
    this._profileTitle = this.getDoc().getProfileTitle();
    this._profileNameField = this.getDoc().getProfileNameField(this.getFormElement());
    this._profileTitleField = this.getDoc().getProfileTitleField(this.getFormElement());
    if (!this.getEditHandler()) {
      this._addEditEventListener();
    }
  }

  _addEditEventListener() {
    this.setEditHandler(() => {
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
    this.getDoc().getEditButton().addEventListener(this.getConfig().getClickEvent(), this.getEditHandler());
  }

  _addSubmitEventListener() {
    this.setSubmitHandler((e) => {
      e.preventDefault();
      this._profileName.textContent = this._profileNameField.value;
      this._profileTitle.textContent = this._profileTitleField.value;
      this.toggleDisplay();
      this.removeEventListeners();
      this.getSaveButtonElement().classList.add(this.getConfig().getInactiveSaveButtonClass());
      this.getSaveButtonElement().disabled = true;
    });
    this.getFormElement().addEventListener(this.getConfig().getSubmitAction(), this.getSubmitHandler());
  }

  display() {
    this._profileNameField.value = this._profileName.textContent;
    this._profileTitleField.value = this._profileTitle.textContent;
    this._addSubmitEventListener()
    this.addCloseEventListener();
    this.toggleDisplay();
  }
}
