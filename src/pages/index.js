import {
  config,
  initialCards,
  cardSelector,
  profileEditModal,
  addCardModal,
  previewImageModal,
  cardListEl,
  previewImageElement,
  previewImageElementTitle,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
// import Popup from "../components/Popup.js";
// import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

//MODAL COMPONENTS
const profileEditForm = document.querySelector("#profile-edit-modal-form");
const addCardForm = document.querySelector("#add-card-form");

//MAIN PAGE BUTTONS
const profileEditButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

//TEMPLATES
// const previewImageElement = previewImageModal.querySelector(
//   ".modal__image-element"
// );
// const previewImageElementTitle = previewImageModal.querySelector(
//   ".modal__image-caption"
// );

const data = { previewImageElement, previewImageElementTitle };

//NODES AND INPUTS
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// function close(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", closeModalEscape);
//   modal.removeEventListener("mousedown", closeModalOverlay);
// }

// function open(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", closeModalEscape);
//   modal.addEventListener("mousedown", closeModalOverlay);
// }

function closeModalOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    close(evt.currentTarget);
  }
}

function closeModalEscape(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    close(modalOpened);
  }
}

// function renderCard(cardEl, container) {
//   container.prepend(cardEl);
// }

//EVENT HANDLERS
function handleImageClick(data) {
  previewImageElement.src = data.link;
  previewImageElement.alt = data.name;
  previewImageElementTitle.textContent = data.name;
  open(previewImageModal);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  close(profileEditModal);
}

//EVENT LISTENERS
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  open(profileEditModal);
});

// profileModalCloseButton.addEventListener("click", () =>
//   close(profileEditModal)
// );

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addNewCardButton.addEventListener("click", () => {
  open(addCardModal);
});

// addCardModalCloseButton.addEventListener("click", () => close(addCardModal));

const handleFormSubmit = (e) => {
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;

  const cardData = { name, link };
  const viewCard = createCard(cardData);
  // renderCard(viewCard, cardListEl);
  close(addCardModal);
  e.target.reset();
};

addCardForm.addEventListener("submit", handleFormSubmit);

// modalImageCloseBtn.addEventListener("click", () => close(previewImageModal));

const createCard = (cardData) => {
  const card = new Card(cardData, cardSelector, handleImageClick);
  cardListEl.prepend(card.getView());
};

//instantiations of formValidator
const profileEditFormValidator = new FormValidator(config, profileEditForm);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();

const layerSection = new Section(
  { items: initialCards, renderer: createCard },
  ".cards__list"
);
layerSection.renderItems();

const popupImage = new PopupWithImage("#image-preview-modal", data);
popupImage.setEventListeners();

// note from Max:
// const myClassInstance = new PopupWithForm(/* arguments */);
// myClassInstance.open(); // this would call the `open()` method in Popup.js

// const newCardPopup = new PopupWithForm("#add-card-modal", handleFormSubmit);
// // newCardPopup.open();
// // newCardPopup.close();
// newCardPopup.setEventListeners();

// const editProfilePopup = new PopupWithForm("#profile-edit-modal", () => {});
// // editProfilePopup.open();
// // editProfilePopup.close();
// setEventListeners();
