const formSection = document.querySelector(".place-popup");
const closeButton = formSection.querySelector(".form__close-button")
const overlayElement = formSection.querySelector(".overlay");
export const toggleDisplay = (section) => {
  section.classList.toggle("hide");
}
const closeHandler = () => {
  toggleDisplay(formSection);
  removeEventListeners();
}
const escapeHandler = (e) => {
  if (e.key === "Escape") {
    toggleDisplay(formSection);
    removeEventListeners();
  }
};
const overlayHandler = () => {
  toggleDisplay(formSection);
  removeEventListeners();
}
const removeEventListeners = () => {
  closeButton.removeEventListener("click", closeHandler);
  document.removeEventListener("keyup", escapeHandler);
  overlayElement.removeEventListener("click", overlayHandler);
}
export const displayPlacePopup = (e) => {
  const placeElement = e.target.parentElement;
  const formPic = formSection.querySelector(".form__pic");
  formPic.src = placeElement.querySelector(".place__picture").src;
  formPic.alt = placeElement.querySelector(".place__picture").alt;
  const formPicName = formSection.querySelector(".form__pic-name");
  const placeName = placeElement.querySelector(".place__name");
  formPicName.textContent = placeName.textContent;
  toggleDisplay(formSection);
  closeButton.addEventListener("click", closeHandler);
  overlayElement.addEventListener("click", overlayHandler);
  document.addEventListener("keyup", escapeHandler);
}



