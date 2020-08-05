import "./index.css";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import Api from "../components/Api.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import {
  editButton,
  addButton,
  profile,
  savingTxt,
  avatarElement
} from "../utils/constants.js";

export const api = new Api(
  "https://around.nomoreparties.co/v1/group-3",
  {
    headers: {
     authorization: "aae17431-b773-4b38-a586-5c35cb6461b9",
     "Content-Type": "application/json"
    }
  }
);

//display, delete, like/unlike card
const popupWithImage = new PopupWithImage(".place-popup");
const confirmDeleteForm = new PopupWithForm(".confirm-popup", {});
const cardCallbacks = {
  handleCardClick: (imageUrl, imageName) => popupWithImage.open(imageUrl, imageName),
  confirmDelete: (card) => {
    confirmDeleteForm.setCallbacks({
      callback1: () => api.removeCard(card.getId()),
      callback2: () => card.remove()
    });
    confirmDeleteForm.open();
  },
  handleCardLike: (evt, cardId) => {
    const callback = ({likes}) => {
      evt.target.parentNode.querySelector(".like__count").textContent = likes.length;
      evt.target.classList.toggle("like__button_active");
    }
    // card.getLikeButtonElement().classList.contains("like__button_active") ?
    evt.target.classList.contains("like__button_active") ?
      api.removeCardLike(cardId, callback) :
      api.addCardLike(cardId, callback);
  }
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

//add card
const newPlaceForm = new PopupWithForm(".new-place-form",
  {
    callback1: ({ name, link }) => api.addCard(name, link),
    callback2: (card) => {
      const newCard = new Card(card, ".place-template", cardCallbacks);
      cardList.prependItem(newCard.getCardElement());
    }
  }
);

//open new place form
addButton.addEventListener("click", () => {
  newPlaceForm.open();
});

//edit profile
const editProfileForm = new PopupWithForm(".edit-profile-form", {
    callback1: (user) => api.updateUserInfo(user),
    callback2: handleSetUserInfo
  }
);

//open edit profile form
editButton.addEventListener("click", () => {
  const user = profile.getUserInfo();
  editProfileForm.populatePopup((popup) => {
    const formSection = popup;
    formSection.querySelector(".form__input_type_name").value = user.name;
    formSection.querySelector(".form__input_type_title").value = user.about;
  })
  editProfileForm.open();
});

const editProfilePictureForm = new PopupWithForm(".edit-profile-picture",
  {
    callback1: (image) => api.updateUserAvatar(image.link),
    callback2: handleSetUserInfo
  }
);

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
