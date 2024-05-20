import { config, initialCards } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
// import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

// // MODALS
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#image-preview-modal");

//MODAL COMPONENTS
const profileEditForm = document.querySelector("#profile-edit-modal-form");
const addCardForm = document.querySelector("#add-card-form");

//MAIN PAGE BUTTONS
const profileEditButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

//CLOSE BUTTONS
const profileModalCloseButton = profileEditModal.querySelector(
  "#profile-close-button"
);
// const addCardModalCloseButton = addCardModal.querySelector(
//   "#add-card-close-button"
// );
// const modalImageCloseBtn = previewImageModal.querySelector(
//   "#modal__image-close-button"
// );
// const closeButtons = document.querySelectorAll(".modal__close");

//TEMPLATES
const cardSelector = "#card-template";
const cardListEl = document.querySelector(".cards__list");
const previewImageElement = previewImageModal.querySelector(
  ".modal__image-element"
);
const previewImageElementTitle = previewImageModal.querySelector(
  ".modal__image-caption"
);

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

// function closeModalOverlay(evt) {
//   if (evt.target === evt.currentTarget) {
//     evt.currentTarget.close();
//   }
// }

// function closeModalEscape(evt) {
//   if (evt.key === "Escape") {
//     const modalOpened = document.querySelector(".modal_opened");
//     modalOpened.close();
//   }
// }

// function renderCard(cardEl, container) {
//   container.prepend(cardEl);
// }

//EVENT HANDLERS
function handleImageClick(data) {
  popupImage.open(data);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  profileEditModal.close();
}

//EVENT LISTENERS
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.open();
});

profileModalCloseButton.addEventListener("click", () =>
  profileEditModal.close()
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addNewCardButton.addEventListener("click", () => {
  addCardModal.open();
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
