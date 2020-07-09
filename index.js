import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js"

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

//Load initial cards
const cardTemplate = document.getElementById("place-template");
const newPlace = cardTemplate.content.cloneNode(true);
const places = container.querySelector(".places");
const listOfPlaces = initialCards.map((card) => {
  const newCard = new Card(card.name, card.link, cardTemplate);
  return newCard.getCard();
});
places.append(...listOfPlaces);

//Toggle to display or hide section
const toggleDisplay = (section) => {
  section.classList.toggle("hide");
  if (!section.classList.contains("hide") && section.classList.contains("edit-profile-form")) {
    processForm(section.querySelector(".form"), "open");
  }
}

//Add event listeners to edit profile form related elements
const editFormSection = container.querySelector(".edit-profile-form");
const editButton = container.querySelector(".edit-button");
editButton.addEventListener("click", () => toggleDisplay(editFormSection));
const editCloseButton = editFormSection.querySelector(".form__close-button")
editCloseButton.addEventListener("click", () => toggleDisplay(editFormSection));

//Add event listeners to new place form related elements
const newPlaceFormSection = container.querySelector(".new-place-form");
const addButton = container.querySelector(".add-button");
addButton.addEventListener("click", () => toggleDisplay(newPlaceFormSection));
const addCloseButton = newPlaceFormSection.querySelector(".form__close-button")
addCloseButton.addEventListener("click", () => toggleDisplay(newPlaceFormSection));

//Process form action
const processForm = (form, action="submit") => {
  if (form.id === "edit-profile") {
    const profileName = container.querySelector(".profile__name");
    const profileTitle = container.querySelector(".profile__title");
    const profileNameField = form.querySelector(".form__input_type_name");
    const profileTitleField = form.querySelector(".form__input_type_title");
    if (action === "open") {
      profileNameField.value = profileName.textContent;
      profileTitleField.value = profileTitle.textContent;
    } else {
      profileName.textContent = profileNameField.value;
      profileTitle.textContent = profileTitleField.value;
    }
  }
  else if (form.id === "new-place") {
    const name = form.querySelector(".form__input_type_title").value;
    const link = form.querySelector(".form__input_type_link").value
    const card = new Card(name, link, cardTemplate);
    places.prepend(card.getCard());
  }
  if (action == "submit") {
    form.reset();
    const saveButton = form.querySelector(".form__save-button");
    saveButton.classList.add("form__save-button_disabled");
    saveButton.disabled = true;
    toggleDisplay(form.parentElement);
  }
}

const formList = [...document.querySelectorAll(".form")];
const forms = formList.filter((f) => !f.classList.contains("form_display_pic"));
forms.forEach((form) => {
  form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    processForm(form);
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
