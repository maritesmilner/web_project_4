import { Document } from "./Document.js";
import { Card } from "./Card.js";
import { EditProfilePopup } from "./EditProfilePopup.js";
import { NewPlacePopup } from "./NewPlacePopup.js";

const doc = new Document();
const conf = doc.getConfig();
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

//Load initial cards
const templateElement = doc.getTemplateElement();
const places = doc.getPlaces();
const listOfPlaces = initialCards.map((card) => {
  const newCard = new Card(card.name, card.link, templateElement);
  return newCard.getCard();
});
places.append(...listOfPlaces);

new EditProfilePopup(doc.getFormSectionElement(conf.getEditFormSectionSelector()));
new NewPlacePopup(doc.getFormSectionElement(conf.getNewPlaceFormSectionSelector()));
