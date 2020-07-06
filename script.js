import { Document } from "./Document.js";
import { Card } from "./Card.js";
import { Popup } from "./Popup.js";
import { EditProfilePopup } from "./EditProfilePopup.js";
import { NewPlacePopup } from "./NewPlacePopup.js";
import { FormValidator } from "./FormValidator.js";

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
  const validator = new FormValidator();
  const formSectionElement = doc.getFormSectionElement(conf.getEditFormSectionSelector());
  const formObject = new EditProfilePopup(formSectionElement);
  validator.enableValidation({
    formObject: formObject,
    inactiveButtonClass: conf.getInactiveSaveButtonClass(),
    inputErrorClass: conf.getInputErrorIndicatorClass(),
    errorClass: conf.getInputErrorMsgClass()
  });
  formObject.display();
});
doc.getAddButton().addEventListener(conf.getClickEvent(), () => {
  const validator = new FormValidator();
  const formSectionElement = doc.getFormSectionElement(conf.getNewPlaceFormSectionSelector());
  const formObject = new NewPlacePopup(formSectionElement);
  validator.enableValidation({
    formObject: formObject,
    inactiveButtonClass: conf.getInactiveSaveButtonClass(),
    inputErrorClass: conf.getInputErrorIndicatorClass(),
    errorClass: conf.getInputErrorMsgClass()
  });
  formObject.toggleDisplay();
  formObject.addCloseEventListener();
})


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


