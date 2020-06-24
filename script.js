//settings
const ADD_BUTTON_SELECTOR = '.add-button';
const CLICK_EVENT = 'click';
const CLOSE_BUTTON_SELECTOR = '.form__close-button';
const CONTAINER_SELECTOR = '.content';
const EDIT_BUTTON_SELECTOR = '.edit-button';
const EDIT_FORM_ID = 'edit-profile';
const EDIT_FORM_SECTION_CLASS = 'edit-profile-form';
const EDIT_FORM_SECTION_SELECTOR = `.${EDIT_FORM_SECTION_CLASS}`;
const ESCAPE_KEY = 'Escape';
const FORM_SELECTOR = '.form';
const FORM_PIC_SELECTOR = '.form__pic';
const FORM_PIC_NAME_SELECTOR = '.form__pic-name';
const HEART_BUTTON_CLASS = 'heart-button';
const HEART_BUTTON_ACTIVE_CLASS = 'heart-button_active';
const HIDE_CLASS = 'hide';
const INPUT_TYPE_LINK_SELECTOR = '.form__input_type_link';
const INPUT_TYPE_NAME_SELECTOR = '.form__input_type_name';
const INPUT_TYPE_TITLE_SELECTOR = '.form__input_type_title';
const KEYUP_EVENT = 'keyup';
const NEW_PLACE_FORM_SECTION_SELECTOR = '.new-place-form';
const NEW_PLACE_ID = 'new-place';
const OPEN_ACTION = 'open';
const OVERLAY_SELECTOR = '.overlay';
const PLACE_NAME_SELECTOR = '.place__name';
const PLACE_PIC_CLASS = 'place__picture';
const PLACE_PIC_SELECTOR = `.${PLACE_PIC_CLASS}`;
const PLACE_POP_UP_SELECTOR = '.place-popup';
const PLACE_TEMPLATE_ID = 'place-template';
const PLACES_SELECTOR = '.places';
const PROFILE_NAME_SELECTOR = '.profile__name';
const PROFILE_TITLE_SELECTOR = '.profile__title';
const SUBMIT_ACTION = 'submit';
const TRASH_BUTTON_CLASS = 'trash-button';

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
const container = document.querySelector(CONTAINER_SELECTOR);
const places = container.querySelector(PLACES_SELECTOR);

//Make each place card
const makeCard = (card) => {
  const newPlace = document.getElementById(PLACE_TEMPLATE_ID).content.cloneNode(true);
  const placePic = newPlace.querySelector(PLACE_PIC_SELECTOR);
  placePic.src = card.link;
  placePic.alt = `Picture of ${card.name}`;
  newPlace.querySelector(PLACE_NAME_SELECTOR).textContent = card.name;
  return newPlace;
}

//Load initial cards
const listOfPlaces = initialCards.map((card) => makeCard(card));
places.append(...listOfPlaces);

//Toggle to display or hide section
const toggleDisplay = (section) => {
  section.classList.toggle(HIDE_CLASS);
  if (!section.classList.contains(HIDE_CLASS) && section.classList.contains(EDIT_FORM_SECTION_CLASS)) {
    processForm(section.querySelector(FORM_SELECTOR), OPEN_ACTION);
  }
}

//Add event listeners to edit profile form related elements
const editFormSection = container.querySelector(EDIT_FORM_SECTION_SELECTOR);
const editButton = container.querySelector(EDIT_BUTTON_SELECTOR);
editButton.addEventListener(CLICK_EVENT, () => toggleDisplay(editFormSection));
const editCloseButton = editFormSection.querySelector(CLOSE_BUTTON_SELECTOR)
editCloseButton.addEventListener(CLICK_EVENT, () => toggleDisplay(editFormSection));

//Add event listeners to new place form related elements
const newPlaceFormSection = container.querySelector(NEW_PLACE_FORM_SECTION_SELECTOR);
const addButton = container.querySelector(ADD_BUTTON_SELECTOR);
addButton.addEventListener(CLICK_EVENT, () => toggleDisplay(newPlaceFormSection));
const addCloseButton = newPlaceFormSection.querySelector(CLOSE_BUTTON_SELECTOR)
addCloseButton.addEventListener(CLICK_EVENT, () => toggleDisplay(newPlaceFormSection));

//Add event listeners to places related elements
const picPopupDisplay = container.querySelector(PLACE_POP_UP_SELECTOR);
picPopupDisplay.querySelector(OVERLAY_SELECTOR).addEventListener(CLICK_EVENT, () => toggleDisplay(picPopupDisplay));
window.addEventListener(KEYUP_EVENT, (evt) => {
  if (!picPopupDisplay.classList.contains(HIDE_CLASS) && evt.key === ESCAPE_KEY) {
    toggleDisplay(picPopupDisplay);
  }
});
picPopupDisplay.querySelector(CLOSE_BUTTON_SELECTOR).addEventListener(CLICK_EVENT, () => toggleDisplay(picPopupDisplay));
places.addEventListener(CLICK_EVENT, (evt) => {
  if (evt.target.classList.contains(HEART_BUTTON_CLASS)) {
    evt.target.classList.toggle(HEART_BUTTON_ACTIVE_CLASS);
  }
  else if (evt.target.classList.contains(TRASH_BUTTON_CLASS)) {
    evt.target.parentElement.remove();
  }
  else if (evt.target.classList.contains(PLACE_PIC_CLASS)) {
    const thisPlace = evt.target.parentElement;
    const formPic = picPopupDisplay.querySelector(FORM_PIC_SELECTOR);
    formPic.src = thisPlace.querySelector(PLACE_PIC_SELECTOR).src;
    formPic.alt = thisPlace.querySelector(PLACE_PIC_SELECTOR).alt;
    picPopupDisplay.querySelector(FORM_PIC_NAME_SELECTOR).textContent = thisPlace.querySelector(PLACE_NAME_SELECTOR).textContent;
    toggleDisplay(picPopupDisplay);
  }
});

//Process form action
const processForm = (form, action=SUBMIT_ACTION) => {
  if (form.id === EDIT_FORM_ID) {
    const profileName = container.querySelector(PROFILE_NAME_SELECTOR);
    const profileTitle = container.querySelector(PROFILE_TITLE_SELECTOR);
    const profileNameField = form.querySelector(INPUT_TYPE_NAME_SELECTOR);
    const profileTitleField = form.querySelector(INPUT_TYPE_TITLE_SELECTOR);
    if (action === OPEN_ACTION) {
      profileNameField.value = profileName.textContent;
      profileTitleField.value = profileTitle.textContent;
    } else {
      profileName.textContent = profileNameField.value;
      profileTitle.textContent = profileTitleField.value;
    }
  }
  else if (form.id === NEW_PLACE_ID) {
    const card = {
      name: form.querySelector(INPUT_TYPE_TITLE_SELECTOR).value,
      link: form.querySelector(INPUT_TYPE_LINK_SELECTOR).value
    };
    places.prepend(makeCard(card));
  }
  if (action == SUBMIT_ACTION) {
    form.reset();
    toggleDisplay(form.parentElement);
  }
}
