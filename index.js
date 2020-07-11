import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { toggleDisplay } from "./util.js";

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
const container = document.querySelector(".content");

const profileName = container.querySelector(".profile__name");
const profileTitle = container.querySelector(".profile__title");
const editButton = container.querySelector(".edit-button");
const editFormSection = container.querySelector(".edit-profile-form");
const editCloseButton = editFormSection.querySelector(".form__close-button")
const profileNameField = editFormSection.querySelector(".form__input_type_name");
const profileTitleField = editFormSection.querySelector(".form__input_type_title");

const newPlaceFormSection = container.querySelector(".new-place-form");
const placeNameField = newPlaceFormSection.querySelector(".form__input_type_title");
const placeLinkField = newPlaceFormSection.querySelector(".form__input_type_link");
const addCloseButton = newPlaceFormSection.querySelector(".form__close-button");
const addButton = container.querySelector(".add-button");
const places = container.querySelector(".places");

//Load initial cards
const listOfPlaces = initialCards.map((card) => {
  return new Card(card.name, card.link, ".place-template").getCard();
});
places.append(...listOfPlaces);

//Add event listeners to edit profile form related elements
const openEditForm = () => {
  profileNameField.value = profileName.textContent;
  profileTitleField.value = profileTitle.textContent;
  toggleDisplay(editFormSection);
}
editButton.addEventListener("click", openEditForm);
editCloseButton.addEventListener("click", () => toggleDisplay(editFormSection));

//Add event listeners to new place form related elements
addButton.addEventListener("click", () => toggleDisplay(newPlaceFormSection));
addCloseButton.addEventListener("click", () => toggleDisplay(newPlaceFormSection));

//Process form action
const saveEditForm = () => {
  profileName.textContent = profileNameField.value;
  profileTitle.textContent = profileTitleField.value;
}
const saveNewPlaceForm = () => {
  const card = new Card(placeNameField.value, placeLinkField.value, ".place-template");
  places.prepend(card.getCard());
}
const processFormSubmit = (form) => {
  if (form.id === "edit-profile") {
    saveEditForm();
  }
  else if (form.id === "new-place") {
    saveNewPlaceForm();
  }
  form.reset();
  const saveButton = form.querySelector(".form__save-button");
  saveButton.classList.add("form__save-button_disabled");
  saveButton.disabled = true;
  toggleDisplay(form.parentElement);
}

const formList = [...document.querySelectorAll(".form")];
const forms = formList.filter((f) => !f.classList.contains("form_display_pic"));
forms.forEach((form) => {
  form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    processFormSubmit(form);
  });
  const validator = new FormValidator({
    submitButtonSelector: ".form__save-button",
    inputSelector: ".form__input",
    inputErrorClass: "form__input_type_error-indicator",
    errorClass: "form__input-error-msg",
    inactiveButtonClass: "form__save-button_disabled"
    }, form);
  validator.enableValidation();
});
