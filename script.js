import { Document } from "./document.js";
import { Card } from "./card.js";
import { Popup } from "./popup.js";
import { EditProfilePopup } from "./edit-profile-popup.js";

const doc = new Document();
const conf = doc.getConfig();
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
},
  {
    name: "Vanois National Park",
    link: "https://code.s3.yandex.net/web-code/vanois.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

//Load initial cards
const templateElement = doc.getTemplateElement();
const places = doc.getPlaces();
const listOfPlaces = initialCards.map((card) => {
  const newCard = new Card(card.name, card.link, templateElement);
  return newCard.getCard();
});
places.append(...listOfPlaces);

doc.getEditButton().addEventListener(conf.getClickEvent(), () => {
  const formSection = doc.getFormSectionElement(conf.getEditFormSectionSelector());
  const popup = new EditProfilePopup(formSection);
  popup.display();
});
doc.getNewPlaceButton().addEventListener(conf.getClickEvent(), () => {
  const formSection = doc.getFormSectionElement(conf.getNewPlaceFormSectionSelector());
  const popup = new Popup(formSection);
  popup.toggleDisplay();
  popup.addCloseEventListener();
});

// //Add event listeners to new place form related elements
// const newPlaceFormSection = container.querySelector(NEW_PLACE_FORM_SECTION_SELECTOR);
// const addButton = container.querySelector(ADD_BUTTON_SELECTOR);
// addButton.addEventListener(CLICK_EVENT, () => toggleDisplay(newPlaceFormSection));
// const addCloseButton = newPlaceFormSection.querySelector(CLOSE_BUTTON_SELECTOR)
// addCloseButton.addEventListener(CLICK_EVENT, () => toggleDisplay(newPlaceFormSection));

// //Add event listeners to places related elements
// const picPopupDisplay = container.querySelector(PLACE_POP_UP_SELECTOR);
// picPopupDisplay.querySelector(OVERLAY_SELECTOR).addEventListener(CLICK_EVENT, () => toggleDisplay(picPopupDisplay));
// window.addEventListener(KEYUP_EVENT, (evt) => {
//   if (!picPopupDisplay.classList.contains(HIDE_CLASS) && evt.key === ESCAPE_KEY) {
//     toggleDisplay(picPopupDisplay);
//   }
// });

// //Process form action
// const processForm = (form, action=SUBMIT_ACTION) => {
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
//   else if (form.id === NEW_PLACE_ID) {
//     const card = {
//       name: form.querySelector(INPUT_TYPE_TITLE_SELECTOR).value,
//       link: form.querySelector(INPUT_TYPE_LINK_SELECTOR).value
//     };
//     places.prepend(makeCard(card));
//   }
//   if (action == SUBMIT_ACTION) {
//     form.reset();
//     toggleDisplay(form.parentElement);
//   }
// }


