import "./index.css";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import {
  editButton,
  addButton,
  avatarElement
} from "../utils/constants.js";

const api = new Api(
  "https://around.nomoreparties.co/v1/group-3",
  {
    headers: {
     authorization: "aae17431-b773-4b38-a586-5c35cb6461b9",
     "Content-Type": "application/json"
    }
  }
);

const profile = new UserInfo(".profile__name", ".profile__title", ".profile__avatar");

//display, delete, like/unlike card
const popupWithImage = new PopupWithImage(".place-popup");
const confirmDeleteForm = new PopupWithForm(
  {
    popupSelector: ".confirm-popup",
    saveButtonEnabledFlag: true
  }
);
const cardCallbacks = {
  handleCardClick: (imageUrl, imageName) => popupWithImage.open(imageUrl, imageName),
  confirmDelete: (card) => {
    confirmDeleteForm.setCallbacks({
      promise: () => api.removeCard(card.getId()),
      callback: () => card.remove()
    });
    confirmDeleteForm.open();
  },
  handleAddLike: (cardId) => api.addCardLike(cardId),
  handleRemoveLike: (cardId) => api.removeCardLike(cardId)
};

//set user profile and display initial cards
const handleSetUserInfo = (user) => profile.setUserInfo(user);
let cardList = null;
api.getInitialData(([user, cards]) => {
  handleSetUserInfo(user);
  cardList = new Section({
    items: cards,
    renderer: (place) => {
      const aPlace = new Card(place, ".place-template", cardCallbacks, user._id);
      cardList.appendItem(aPlace.getCardElement());
    }
  }, ".places");
  cardList.renderItems();
})

//add new place
const newPlaceForm = new PopupWithForm(
  {
    promise: ({ name, link }) => api.addCard(name, link),
    callback: (card) => {
      const newCard = new Card(card, ".place-template", cardCallbacks);
      cardList.prependItem(newCard.getCardElement());
    },
    popupSelector: ".new-place-form"
  }
);

//open new place form
addButton.addEventListener("click", () => newPlaceForm.open());

//edit profile
const editProfileForm = new PopupWithForm(
  {
    promise: (user) => api.updateUserInfo(user),
    callback: handleSetUserInfo,
    popupSelector: ".edit-profile-form"
  }
);

//open edit profile form
editButton.addEventListener("click", () => {
  editProfileForm.setInputValues(profile.getUserInfo());
  editProfileForm.open();
});

const editProfilePictureForm = new PopupWithForm(
  {
    promise: (image) => api.updateUserAvatar(image.link),
    callback: handleSetUserInfo,
    popupSelector: ".edit-profile-picture"
  }
);

//open edit profile picture form
avatarElement.addEventListener("click", () => {
  editProfilePictureForm.open();
})

//place validation on form input fields
const formList = [...document.querySelectorAll(".form")];
const forms = formList.filter((f) =>
  !f.classList.contains("form_display_pic") &&
  !f.classList.contains("form_confirm_delete")
);
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
