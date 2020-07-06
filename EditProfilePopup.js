import {Popup} from "./Popup.js";

export class EditProfilePopup extends Popup {
  constructor(popupSectionElement) {
    super(popupSectionElement);
    this._profileName = this.getDoc().getProfileName();
    this._profileTitle = this.getDoc().getProfileTitle();
    this._profileNameField = this.getDoc().getProfileNameField(this.getFormElement());
    this._profileTitleField = this.getDoc().getProfileTitleField(this.getFormElement());
  }

  display() {
    this._profileNameField.value = this._profileName.textContent;
    this._profileTitleField.value = this._profileTitle.textContent;
    this._addSubmitEventListener()
    this.addCloseEventListener();
    this.toggleDisplay();
  }

  _addSubmitEventListener() {
    const handler = (e) => {
      e.preventDefault();
      this._profileName.textContent = this._profileNameField.value;
      this._profileTitle.textContent = this._profileTitleField.value;
      this.toggleDisplay();
      this.getFormElement().removeEventListener(this._config.getSubmitAction(), handler);
    }
    this.getFormElement().addEventListener(this._config.getSubmitAction(), handler);
  }
}
