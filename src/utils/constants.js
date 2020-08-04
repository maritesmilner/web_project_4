import Api from "../components/Api.js";
import UserInfo from "../components/UserInfo.js";

const container = document.querySelector(".content");
export const editButton = document.getElementById("edit-profile-button");
export const avatarElement = container.querySelector(".profile__avatar-container");
const editFormSection = container.querySelector(".edit-profile-form");
export const profileNameField = editFormSection.querySelector(".form__input_type_name");
export const profileTitleField = editFormSection.querySelector(".form__input_type_title");
export const addButton = container.querySelector(".add-button");
export const profile = new UserInfo(".profile__name", ".profile__title", ".profile__avatar");
export const api = new Api(
  "https://around.nomoreparties.co/v1/group-3",
  {
    headers: {
     authorization: "aae17431-b773-4b38-a586-5c35cb6461b9",
     "Content-Type": "application/json"
    }
  }
);

const confirmPopupSection = container.querySelector(".confirm-popup");
export const confirmYesButton = confirmPopupSection.querySelector(".form__save-button");
export const savingTxt = "Saving...";
export const meEntity = "users/me";
export const cardsEntity = "cards";
export const avatarEntity = `${meEntity}/avatar`;
export const cardLikesEntity = `${cardsEntity}/likes`;
