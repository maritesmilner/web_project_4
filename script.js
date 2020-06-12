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
const container = document.querySelector('.content');

//add event listener to the pop-up place pic display
const picPopupDisplay = container.querySelector('.place-popup');
picPopupDisplay.querySelector('.form__close-button').addEventListener('click', () => toggleForm(picPopupDisplay));

//Make each place card
function makeCard(card) {
  const newPlace = document.getElementById('place-template').content.cloneNode(true);
  const placePic = newPlace.querySelector('.place__picture');
  placePic.src = card.link;
  placePic.alt = `Picture of ${card.name}`;
  placePic.addEventListener("click", (evt) => {
    const thisPlace = evt.target.parentElement;
    const formPic = picPopupDisplay.querySelector('.form__pic');
    formPic.src = thisPlace.querySelector('.place__picture').src;
    formPic.alt = thisPlace.querySelector('.place__picture').alt;
    picPopupDisplay.querySelector('.form__pic-name').textContent = thisPlace.querySelector('.place__name').textContent;
    toggleForm(picPopupDisplay);
  });
  newPlace.querySelector('.place__name').textContent = card.name;
  newPlace.querySelector('.heart-button').addEventListener('click', (evt) => evt.target.classList.toggle("heart-button_active"));
  newPlace.querySelector('.trash-button').addEventListener('click', (evt) => evt.target.parentElement.remove());
  return newPlace;
}

//Load initial cards
const places = container.querySelector('.places');
const newPlaces = initialCards.map(card => makeCard(card));
places.append(...newPlaces);

//Toggle form to display or hide
function toggleForm(section) {
  section.classList.toggle('hide');
}

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
addButton.addEventListener('click', () => toggleForm(newPlaceForm));
const newPlaceForm = container.querySelector('.new-place-form');
const npfCloseButton = newPlaceForm.querySelector('.form__close-button');
npfCloseButton.addEventListener('click', () => toggleForm(newPlaceForm));
const npfSaveButton = newPlaceForm.querySelector('.form__save-button');
let name = newPlaceForm.querySelector('.form__input_type_title');
let link = newPlaceForm.querySelector('.form__input_type_link');
name.addEventListener('keyup', (evt) => {
  if (isEnterKey(evt)) {
    npfSaveButton.click();
  }
});
link.addEventListener('keyup', (evt) => {
  if (isEnterKey(evt)) {
    npfSaveButton.click();
  }
});
function isEnterKey(evt) {
  if (evt.keyCode === 13) {
    // Cancel the default action, if needed
    evt.preventDefault();
    // Trigger the button element with a click
    return true;
  }
}
npfSaveButton.addEventListener('click', () => {
  const card = {
    name: name.value,
    link: link.value
  };
  places.prepend(makeCard(card));
  name.value = "";
  link.value = "";
  toggleForm(newPlaceForm);
});




