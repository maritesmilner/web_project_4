import "./index.css";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import {
  editButton,
  profileNameField,
  profileTitleField,
  addButton,
  initialCards
} from "../utils/constants.js";

const popupWithImage = new PopupWithImage(".place-popup");
const handleCardClick = (card) => {
  popupWithImage.open(card);
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

const profile = new UserInfo(".profile__name", ".profile__title");
const handleEditProfileSubmit = ({ name, title }) => {
  profile.setUserInfo(name, title);
}
const editProfileForm = new PopupWithForm(".edit-profile-form", handleEditProfileSubmit);
editButton.addEventListener("click", () => {
  const user = profile.getUserInfo();
  profileNameField.value = user.name;
  profileTitleField.value = user.title;
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
