let container = document.querySelector('.content');
let editButton = container.querySelector('.edit-button');
let profileName = container.querySelector('.profile__name');
let profileTitle = container.querySelector('.profile__title');
let formSection = container.querySelector('.form-elements');
let saveButton = formSection.querySelector('.form__save-button');
let closeButton = formSection.querySelector('.close-button');
let nameField = formSection.querySelector('.form__input_type_name');
let titleField = formSection.querySelector('.form__input_type_title');

function dislayFormSection() {
  nameField.value = profileName.innerHTML;
  titleField.value = profileTitle.innerHTML;
  formSection.style.display = 'block';
}
function hideFormSection() {
  formSection.style.display = 'none';
}
function saveProfile() {
  profileName.innerHTML = nameField.value;
  profileTitle.innerHTML = titleField.value;
  hideFormSection();
}

editButton.addEventListener('click', dislayFormSection);
closeButton.addEventListener('click', hideFormSection);
saveButton.addEventListener('click', saveProfile);
