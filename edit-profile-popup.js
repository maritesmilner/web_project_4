import {Popup} from "./popup.js";

export class EditProfilePopup extends Popup {
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

  // const editFormSection = container.querySelector(EDIT_FORM_SECTION_SELECTOR);
  // const editButton = container.querySelector(EDIT_BUTTON_SELECTOR);
  // editButton.addEventListener(CLICK_EVENT, () => toggleDisplay(editFormSection));
  // const editCloseButton = editFormSection.querySelector(CLOSE_BUTTON_SELECTOR)
  // editCloseButton.addEventListener(CLICK_EVENT, () => toggleDisplay(editFormSection));

  //   if (form.id === EDIT_FORM_ID) {
//     const profileName = container.querySelector(PROFILE_NAME_SELECTOR);
//     const profileTitle = container.querySelector(PROFILE_TITLE_SELECTOR);
//     const profileNameField = form.querySelector(INPUT_TYPE_NAME_SELECTOR);
//     const profileTitleField = form.querySelector(INPUT_TYPE_TITLE_SELECTOR);
//     if (action === OPEN_ACTION) {
//       profileNameField.value = profileName.textContent;
//       profileTitleField.value = profileTitle.textContent;
//     } else {
//       profileName.textContent = profileNameField.value;
//       profileTitle.textContent = profileTitleField.value;
//     }
//   }


}
