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

//Toggle to display or hide section
function toggleDisplay(section) {
  section.classList.toggle('hide');
  if (!section.classList.contains("hide") && section.classList.contains("edit-profile-form")) {
    processEditProfile(document.getElementById("edit-profile"), "open");
  }
}

//Add event listeners to places related elements
const picPopupDisplay = container.querySelector('.place-popup');
picPopupDisplay.querySelector('.overlay').addEventListener('click', () => toggleDisplay(picPopupDisplay));
window.addEventListener('keyup', (evt) => {
  if (!picPopupDisplay.classList.contains("hide") && evt.key === "Escape") {
    toggleDisplay(picPopupDisplay);
  }
});
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

//Process adding of new place
const processNewPlace = (form) => {
  const card = {
    name: form.querySelector('.form__input_type_title').value,
    link: form.querySelector('.form__input_type_link').value
  };
  places.prepend(makeCard(card));
}

