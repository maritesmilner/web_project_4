const container = document.querySelector('.content');
const profileName = container.querySelector('.profile__name');
const profileTitle = container.querySelector('.profile__title');

//Edit Profile Form functions
const editButton = container.querySelector('.edit-button');
const editProfileForm = container.querySelector('.edit-profile-form');
const edfSaveButton = editProfileForm.querySelector('.form__save-button');
const edfCloseButton = editProfileForm.querySelector('.form__close-button');
const nameField = editProfileForm.querySelector('.form__input_type_name');
const titleField = editProfileForm.querySelector('.form__input_type_title');

function dislayEditForm() {
  nameField.value = profileName.innerHTML;
  titleField.value = profileTitle.innerHTML;
  editProfileForm.style.display = 'block';
}
function hideEditForm() {
  editProfileForm.style.display = 'none';
}
function saveProfile() {
  profileName.innerHTML = nameField.value;
  profileTitle.innerHTML = titleField.value;
  hideEditForm();
}

//New Place Form functions
const addButton = container.querySelector('.add-button');
const places = container.querySelector('.places');
const newPlaceForm = container.querySelector('.new-place-form');
const npfCloseButton = newPlaceForm.querySelector('.form__close-button');
const npfSaveButton = newPlaceForm.querySelector('.form__save-button');
const placeTitleField = newPlaceForm.querySelector('.form__input_type_place-title');
const imageLinkField = newPlaceForm.querySelector('.form__input_type_image-link');

function displayNewPlaceForm() {
  newPlaceForm.style.display = 'block';
}
function hideNewPlaceForm() {
  newPlaceForm.style.display = 'none';
}
function addNewPlace() {
  let placeTitle = placeTitleField.value;
  let imageLink = imageLinkField.value;
  if (placeTitle == '') {
    placeTitle = 'No Title'
  }
  places.insertAdjacentHTML("beforeend", `
      <li class="place">
        <img src="${imageLink}" alt="Picture of ${placeTitle}" class="place__picture">
        <div class="place__name-group">
          <h3 class="place__name">${placeTitle}</h3>
          <img src="./images/heart.svg" alt="heart icon" class="heart-button">
        </div>
      </li>
`);
  hideNewPlaceForm();
}

editButton.addEventListener('click', dislayEditForm);
edfCloseButton.addEventListener('click', hideEditForm);
edfSaveButton.addEventListener('click', saveProfile);

addButton.addEventListener('click', displayNewPlaceForm);
npfCloseButton.addEventListener('click', hideNewPlaceForm);
npfSaveButton.addEventListener('click', addNewPlace);

