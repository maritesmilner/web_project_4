//Load 6 initial cards
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
const placeTemplate = document.getElementById('place-template');
const container = document.querySelector('.content');
const places = container.querySelector('.places');
const newPlaces = initialCards.map(card => makeCard(card));
places.append(...newPlaces);

//Edit Profile Form
const editProfileForm = container.querySelector('.edit-profile-form');
const editButton = container.querySelector('.edit-button');
const edfCloseButton = editProfileForm.querySelector('.form__close-button');
const edfSaveButton = editProfileForm.querySelector('.form__save-button');
const profileName = container.querySelector('.profile__name');
const profileTitle = container.querySelector('.profile__title');
const profileNameField = editProfileForm.querySelector('.form__input_type_name');
const profileTitleField = editProfileForm.querySelector('.form__input_type_title');
editButton.addEventListener('click', () => {
  profileNameField.value = profileName.textContent;
  profileTitleField.value = profileTitle.textContent;
  toggleForm(editProfileForm);
});
edfSaveButton.addEventListener('click', () => {
  profileName.textContent = profileNameField.value;
  profileTitle.textContent = profileTitleField.value;
  toggleForm(editProfileForm);
});
edfCloseButton.addEventListener('click', () => toggleForm(editProfileForm));

//New Place Form
const addButton = container.querySelector('.add-button');
const newPlaceForm = container.querySelector('.new-place-form');
const npfCloseButton = newPlaceForm.querySelector('.form__close-button');
const npfSaveButton = newPlaceForm.querySelector('.form__save-button');
addButton.addEventListener('click', () => toggleForm(newPlaceForm));
npfCloseButton.addEventListener('click', () => toggleForm(newPlaceForm));
npfSaveButton.addEventListener('click', () => {
  let name = newPlaceForm.querySelector('.form__input_type_title');
  let link = newPlaceForm.querySelector('.form__input_type_link');
  const card = {
    name: name.value,
    link: link.value
  };
  places.prepend(makeCard(card));
  name.value = "";
  link.value = "";
  toggleForm(newPlaceForm);
});

//Shared functions
function toggleForm(form) {
  form.classList.toggle('form_hide');
}
function makeCard(card) {
  const newPlace = placeTemplate.content.cloneNode(true);
  const placePic = newPlace.querySelector('.place__picture');
  placePic.src = card.link;
  placePic.alt = `Picture of ${card.name}`;
  placePic.addEventListener("click", (evt) => evt.target.parentElement.remove());
  newPlace.querySelector('.place__name').textContent = card.name;
  newPlace.querySelector('.heart-button').addEventListener("click", (evt) => evt.target.classList.toggle("heart-button_active"));
  newPlace.querySelector('.trash-button').addEventListener("click", (evt) => evt.target.parentElement.remove());
  return newPlace;
}


