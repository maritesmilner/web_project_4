import "./index.css";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import {
  profileName,
  profileTitle,
  editButton,
  profileNameField,
  profileTitleField,
  addButton,
  initialCards,
  container
} from "../utils/constants.js";

const handleCardClick = (card) => {
  const formSection = container.querySelector(".place-popup");
  const formPic = formSection.querySelector(".form__pic");
  formPic.src = card.querySelector(".place__picture").src;
  formPic.alt = card.querySelector(".place__picture").alt;
  const formPicName = formSection.querySelector(".form__pic-name");
  formPicName.textContent = card.querySelector(".place__name").textContent;
  const popup = new PopupWithImage(".place-popup", card);
  popup.open();
}
const cardList = new Section({
  items: initialCards,
  renderer: ({ name, link }) => {
    const place = new Card(name, link, ".place-template", handleCardClick);
    cardList.appendItem(place.getCard());
  }
}, ".places");
cardList.renderItems();

const handleNewPlaceSubmit = ({ name, link }) => {
  const place = new Card(name, link, ".place-template", handleCardClick);
  cardList.prependItem(place.getCard());
}
const newPlaceForm = new PopupWithForm(".new-place-form", handleNewPlaceSubmit);
addButton.addEventListener("click", () => {
  newPlaceForm.open();
});

const handleEditProfileSubmit = ({ name, title }) => {
  const profile = new UserInfo(name, title);
  profile.setUserInfo();
}
const editProfileForm = new PopupWithForm(".edit-profile-form", handleEditProfileSubmit);
editButton.addEventListener("click", () => {
  profileNameField.value = profileName.textContent;
  profileTitleField.value = profileTitle.textContent;
  editProfileForm.open();
});

const formList = [...document.querySelectorAll(".form")];
const forms = formList.filter((f) => !f.classList.contains("form_display_pic"));
forms.forEach((form) => {
  const validator = new FormValidator({
    submitButtonSelector: ".form__save-button",
    inputSelector: ".form__input",
    inputErrorClass: "form__input_type_error-indicator",
    errorClass: "form__input-error-msg",
    inactiveButtonClass: "form__save-button_disabled"
    }, form);
  validator.enableValidation();
});
