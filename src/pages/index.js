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
    api.getMe(),
    api.getCards()
  ]).then((responses) => {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    ));
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
const deleteCard = (cardId, callback) => {
  api.removeCard(cardId)
  .then((res) => {
    return res.ok ? Promise.resolve(true) : Promise.reject(`Error: ${res.status}`);
  })
  .then((res) => {
    callback(res);
  })
  .catch((err) => {
    console.log(err);
  });
}

confirmYesButton.addEventListener("click", () => {
  deleteCard(cardToBeDeleted.getId(), () => {
    cardToBeDeleted.getCardElement().remove();
    cardToBeDeleted = null;
    confirmDeleteForm.close();
  });
});

//add card
const addCard = (name, link, callback) => {
  api.addCard(name, link)
  .then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  })
  .then((res) => {
    callback(res);
  })
  .catch((err) => {
    console.log(err);
  });
};

const newPlaceForm = new PopupWithForm(".new-place-form", ({ name, link }) => {
  const saveButtonElement = newPlaceForm.getSaveButton();
  const origButtonLabel = saveButtonElement.textContent;
  saveButtonElement.textContent = savingTxt;
  addCard(name, link, (card) => {
    const newCard = new Card(card, ".place-template", cardCallbacks);
    cardList.prependItem(newCard.getCardElement());
    saveButtonElement.textContent = origButtonLabel;
    newPlaceForm.resetForm();
    newPlaceForm.close();
  });
});

//open new place form
addButton.addEventListener("click", () => {
  newPlaceForm.open();
});

//edit profile
const editProfile = (user, callback) => {
  api.updateUserInfo(user)
  .then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  })
  .then((res) => {
    callback(res);
  })
  .catch((err) => {
    console.log(err);
  });
};

const editProfileForm = new PopupWithForm(".edit-profile-form", (user) => {
  const saveButtonElement = editProfileForm.getSaveButton();
  const origButtonLabel = saveButtonElement.textContent;
  saveButtonElement.textContent = savingTxt;
  editProfile(user, (user) => {
    handleSetUserInfo(user);
    saveButtonElement.textContent = origButtonLabel;
    editProfileForm.resetForm();
    editProfileForm.close();
  })
});

//open edit profile form
editButton.addEventListener("click", () => {
  const user = profile.getUserInfo();
  profileNameField.value = user.name;
  profileTitleField.value = user.about;
  editProfileForm.open();
});

//edit profile picture
const editProfilePic = (imageLink, callback) => {
  api.updateUserAvatar(imageLink)
  .then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  })
  .then((res) => {
    callback(res);
  })
  .catch((err) => {
    console.log(err);
  });
};
const editProfilePictureForm = new PopupWithForm(".edit-profile-picture", (image) => {
  const saveButtonElement = editProfilePictureForm.getSaveButton();
  const origButtonLabel = saveButtonElement.textContent;
  saveButtonElement.textContent = savingTxt;
  editProfilePic(image.link, (user) => {
    handleSetUserInfo(user);
    saveButtonElement.textContent = origButtonLabel;
    editProfilePictureForm.resetForm();
    editProfilePictureForm.close();
  })
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
