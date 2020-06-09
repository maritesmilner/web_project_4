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
initialCards.forEach(function (card) {
  const newPlace = placeTemplate.content.cloneNode(true);
  const placePic = newPlace.querySelector('.place__picture');
  placePic.src = card.link;
  placePic.alt = `Picture of ${card.name}`;
  const placeName = newPlace.querySelector('.place__name');
  placeName.textContent = card.name;
  places.appendChild(newPlace);
})

//Edit Profile Form functions
const profileName = container.querySelector('.profile__name');
const profileTitle = container.querySelector('.profile__title');
const editButton = container.querySelector('.edit-button');
const editProfileForm = container.querySelector('.edit-profile-form');
const edfSaveButton = editProfileForm.querySelector('.form__save-button');
const edfCloseButton = editProfileForm.querySelector('.form__close-button');
const nameField = editProfileForm.querySelector('.form__input_type_name');
const titleField = editProfileForm.querySelector('.form__input_type_title');

function dislayEditForm() {
  nameField.value = profileName.innerHTML;
  titleField.value = profileTitle.innerHTML;
  toggleEditForm();
}
function toggleEditForm() {
  editProfileForm.classList.toggle('edit-profile-form_hide');
}
function saveProfile() {
  profileName.textContent = nameField.value;
  profileTitle.textContent = titleField.value;
  toggleEditForm();
}

editButton.addEventListener('click', dislayEditForm);
edfCloseButton.addEventListener('click', toggleEditForm);
edfSaveButton.addEventListener('click', saveProfile);


