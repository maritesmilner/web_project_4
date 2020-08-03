import "./index.css";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import {
  editButton,
  profileNameField,
  profileTitleField,
  addButton,
  profile,
  api,
  confirmYesButton,
  savingTxt,
  avatarElement
} from "../utils/constants.js";

//get initial data
const getInitialData = (callback) => {
  Promise.all([
    api.getFetchPromise("users/me"),
    api.getFetchPromise("cards")
  ]).then((responses) => {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Error: ${response.status}`);
    }));
  }).then((data) => {
    callback(data);
  }).catch((error) => {
    console.log(error);
  });
}
const handleSetUserInfo = (user) => profile.setUserInfo(user);
let cardList = null;

//set user profile and display initial cards
getInitialData(([user, cards]) => {
  handleSetUserInfo(user);
  cardList = new Section({
    items: cards,
    renderer: (place) => {
      const aPlace = new Card(place, ".place-template", cardCallbacks);
      cardList.appendItem(aPlace.getCardElement());
    }
  }, ".places");
  cardList.renderItems();
})

//confirm card delete
const popupWithImage = new PopupWithImage(".place-popup");
const confirmDeleteForm = new PopupWithForm(".confirm-popup");
let cardToBeDeleted = null;
const cardCallbacks = {
  handleCardClick: (card) => popupWithImage.open(card),
  confirmDelete: (cardObject) => {
    confirmDeleteForm.open();
    cardToBeDeleted = cardObject;
  }
};

//delete card
confirmYesButton.addEventListener("click", () => {
  api.handleData(
    { entity: `cards/${cardToBeDeleted.getCardId()}`,
      method: "DELETE"
    }
  );
  cardToBeDeleted.getCardElement().remove();
  cardToBeDeleted = null;
  confirmDeleteForm.close();
});

//new place
const newPlaceForm = new PopupWithForm(".new-place-form", ({ name, link }) => {
  const saveButtonElement = newPlaceForm.getSaveButton();
  const origButtonLabel = saveButtonElement.textContent;
  saveButtonElement.textContent = savingTxt;
  api.handleData(
    { entity: "cards",
      method: "POST",
      body: JSON.stringify({
        name: name,
        link: link
      })
    },
    (card) => {
      const newCard = new Card(card, ".place-template", cardCallbacks);
      cardList.prependItem(newCard.getCardElement());
      saveButtonElement.textContent = origButtonLabel;
      newPlaceForm.resetForm();
      newPlaceForm.close();
    }
  );
});

//open new place form
addButton.addEventListener("click", () => {
  newPlaceForm.open();
});

//edit profile
const editProfileForm = new PopupWithForm(".edit-profile-form", (user) => {
  const saveButtonElement = editProfileForm.getSaveButton();
  const origButtonLabel = saveButtonElement.textContent;
  saveButtonElement.textContent = savingTxt;
  api.handleData(
    { entity: "users/me",
      method: "PATCH",
      body: JSON.stringify(user)
    },
    (user) => {
      handleSetUserInfo(user);
      saveButtonElement.textContent = origButtonLabel;
      editProfileForm.resetForm();
      editProfileForm.close();
    }
  );
});

//open edit profile form
editButton.addEventListener("click", () => {
  const user = profile.getUserInfo();
  profileNameField.value = user.name;
  profileTitleField.value = user.about;
  editProfileForm.open();
});

//edit profile picture
const editProfilePictureForm = new PopupWithForm(".edit-profile-picture", (user) => {
  const saveButtonElement = editProfilePictureForm.getSaveButton();
  const origButtonLabel = saveButtonElement.textContent;
  saveButtonElement.textContent = savingTxt;
  api.handleData(
    { entity: "users/me/avatar",
      method: "PATCH",
      body: JSON.stringify({ avatar: user.link })
    },
    (user) => {
      handleSetUserInfo(user);
      saveButtonElement.textContent = origButtonLabel;
      editProfilePictureForm.resetForm();
      editProfilePictureForm.close();
    }
  );
});
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
