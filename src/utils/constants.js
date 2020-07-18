export const initialCards = [
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

export const profileName = container.querySelector(".profile__name");
export const profileTitle = container.querySelector(".profile__title");
export const editButton = container.querySelector(".edit-button");
export const editFormSection = container.querySelector(".edit-profile-form");
export const editCloseButton = editFormSection.querySelector(".form__close-button")
export const profileNameField = editFormSection.querySelector(".form__input_type_name");
export const profileTitleField = editFormSection.querySelector(".form__input_type_title");

export const newPlaceFormSection = container.querySelector(".new-place-form");
export const placeNameField = newPlaceFormSection.querySelector(".form__input_type_title");
export const placeLinkField = newPlaceFormSection.querySelector(".form__input_type_link");
export const addCloseButton = newPlaceFormSection.querySelector(".form__close-button");
export const addButton = container.querySelector(".add-button");
export const places = container.querySelector(".places");
