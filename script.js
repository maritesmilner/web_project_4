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

//Make each place card
const makeCard = (card) => {
  const newPlace = document.getElementById('place-template').content.cloneNode(true);
  const placePic = newPlace.querySelector('.place__picture');
  placePic.src = card.link;
  placePic.alt = `Picture of ${card.name}`;
  newPlace.querySelector('.place__name').textContent = card.name;
  return newPlace;
}

//Load initial cards
const container = document.querySelector('.content');
const places = container.querySelector('.places');
const listOfPlaces = initialCards.map((card) => makeCard(card));
places.append(...listOfPlaces);

//Add event listeners to places
const picPopupDisplay = container.querySelector('.place-popup');
picPopupDisplay.querySelector('.form__close-button').addEventListener('click', () => toggleDisplay(picPopupDisplay));
places.addEventListener('click', (evt) => {
  if (evt.target.classList.contains("heart-button")) {
    evt.target.classList.toggle("heart-button_active");
  }
  else if (evt.target.classList.contains("trash-button")) {
    evt.target.parentElement.remove();
  }
  else if (evt.target.classList.contains("place__picture")) {
    const thisPlace = evt.target.parentElement;
    const formPic = picPopupDisplay.querySelector('.form__pic');
    formPic.src = thisPlace.querySelector('.place__picture').src;
    formPic.alt = thisPlace.querySelector('.place__picture').alt;
    picPopupDisplay.querySelector('.form__pic-name').textContent = thisPlace.querySelector('.place__name').textContent;
    toggleDisplay(picPopupDisplay);
  }
});

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error-indicator");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error-msg");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  console.log(`#${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error-indicator");
  errorElement.classList.remove("form__input-error-msg");
  errorElement.textContent = "";
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form__save-button_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("form__save-button_disabled");
    buttonElement.disabled = false;
  }
};

//Process edit profile
const processEditProfile = (form, action="submit") => {
  const profileName = container.querySelector('.profile__name');
  const profileTitle = container.querySelector('.profile__title');
  const profileNameField = form.querySelector('.form__input_type_name');
  const profileTitleField = form.querySelector('.form__input_type_title');
  if (action === "open") {
    profileNameField.value = profileName.textContent;
    profileTitleField.value = profileTitle.textContent;
  } else {
    profileName.textContent = profileNameField.value;
    profileTitle.textContent = profileTitleField.value;
  }
}

//Toggle to display or hide section
function toggleDisplay(section) {
  section.classList.toggle('hide');
  if (!section.classList.contains("hide") && section.classList.contains("edit-profile-form")) {
    processEditProfile(document.getElementById("edit-profile"), "open");
  }
}

//Set event listeners for each form element
const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(".form__input"));
  const submitButton = form.querySelector(".form__save-button");
  toggleButtonState(inputList, submitButton);
  const closeButton = form.querySelector('.form__close-button')
  closeButton.addEventListener('click', () => toggleDisplay(form.parentElement));
  const openButton = document.getElementById(form.id).elements["open-button"];
  openButton.addEventListener('click', () => toggleDisplay(form.parentElement));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(form, inputElement);
      toggleButtonState(inputList, submitButton);
    });
  });
};

//Process adding of new place
const processNewPlace = (form) => {
  const card = {
    name: form.querySelector('.form__input_type_title').value,
    link: form.querySelector('.form__input_type_link').value
  };
  places.prepend(makeCard(card));
}

const enableValidation = () => {
  const formList = Array.from(document.forms);
  formList.forEach((form) => {
    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
      if (form.id === "edit-profile") {
        processEditProfile(form);
      } else if (form.id === "new-place") {
        processNewPlace(form);
      }
      form.reset();
      toggleDisplay(form.parentElement);
      const inputList = Array.from(form.querySelectorAll(".form__input"));
      const submitButton = form.querySelector(".form__save-button");
      toggleButtonState(inputList, submitButton);
    });
    setEventListeners(form);
  });
};

enableValidation();
