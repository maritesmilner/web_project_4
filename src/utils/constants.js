import UserInfo from "../components/UserInfo.js";

const container = document.querySelector(".content");
export const editButton = document.getElementById("edit-profile-button");
export const avatarElement = container.querySelector(".profile__avatar-container");
export const addButton = container.querySelector(".add-button");
export const profile = new UserInfo(".profile__name", ".profile__title", ".profile__avatar");
export const savingTxt = "Saving...";
export const meEntity = "users/me";
export const cardsEntity = "cards";
export const avatarEntity = `${meEntity}/avatar`;
export const cardLikesEntity = `${cardsEntity}/likes`;
