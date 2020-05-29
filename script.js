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


