import {Popup} from "./popup.js";

export class NewPlacePopup extends Popup {
  constructor(popupSectionElement) {
    super(popupSectionElement);
  }

  display() {
    const profileName = this.getDoc().getProfileName();
    const profileTitle = this.getDoc().getProfileTitle();
    const profileNameField = this.getDoc().getProfileNameField(this.getPopupForm());
    const profileTitleField = this.getDoc().getProfileTitleField(this.getPopupForm());
    profileNameField.value = profileName.textContent;
    profileTitleField.value = profileTitle.textContent;
    this.addCloseEventListener();
    this.toggleDisplay();
  }
// //Add event listeners to new place form related elements
// const newPlaceFormSection = container.querySelector(NEW_PLACE_FORM_SECTION_SELECTOR);
// const addButton = container.querySelector(ADD_BUTTON_SELECTOR);
// addButton.addEventListener(CLICK_EVENT, () => toggleDisplay(newPlaceFormSection));
// const addCloseButton = newPlaceFormSection.querySelector(CLOSE_BUTTON_SELECTOR)
// addCloseButton.addEventListener(CLICK_EVENT, () => toggleDisplay(newPlaceFormSection));

}
