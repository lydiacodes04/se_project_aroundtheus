import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const cardSelector = "#card-template";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// MODALS
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#image-preview-modal");

//MODAL COMPONENTS
const profileEditForm = document.querySelector("#profile-edit-modal-form");
const addCardForm = document.querySelector("#add-card-form");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//MAIN PAGE BUTTONS
const profileEditButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

//MODAL BUTTONS
const profileModalCloseButton = profileEditModal.querySelector(
  "#profile-close-button"
);
const addCardModalCloseButton = addCardModal.querySelector(
  "#add-card-close-button"
);
const modalImageCloseBtn = previewImageModal.querySelector(
  "#modal__image-close-button"
);

const closeButtons = document.querySelectorAll(".modal__close");

//TEMPLATES
const previewImageElement = previewImageModal.querySelector(
  ".modal__image-element"
);
const previewImageElementTitle = previewImageModal.querySelector(
  ".modal__image-caption"
);

//NODES AND INPUTS
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardInput = document.querySelector("#add-card-modal");
const cardTitleInput = document.querySelector("#card-title-input");
const cardImageInput = document.querySelector("#card-image-input");

// FUNCTIONS

// Refactor toggleModal(modal) to close() and open()

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
//     close(evt.currentTarget);
//   }
// }

// function closeModalEscape(evt) {
//   if (evt.key === "Escape") {
//     const modalOpened = document.querySelector(".modal_opened");
//     close(modalOpened);
//   }
// }

export function renderCard(cardEl, container) {
  container.prepend(cardEl);
}

//EVENT HANDLERS
// function handleImageClick(data) {
//   previewImageElement.src = data.link;
//   previewImageElement.alt = data.name;
//   previewImageElementTitle.textContent = data.name;
//   open(previewImageModal);
// }

// function handleProfileEditSubmit(e) {
//   e.preventDefault();
//   profileTitle.textContent = profileTitleInput.value;
//   profileDescription.textContent = profileDescriptionInput.value;
//   close(profileEditModal);
// }

//EVENT LISTENERS
// profileEditButton.addEventListener("click", () => {
//   profileTitleInput.value = profileTitle.textContent;
//   profileDescriptionInput.value = profileDescription.textContent;
//   open(profileEditModal);
// });

// profileModalCloseButton.addEventListener("click", () =>
//   close(profileEditModal)
// );

// profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// addNewCardButton.addEventListener("click", () => {
//   open(addCardModal);
// });

// addCardModalCloseButton.addEventListener("click", () => close(addCardModal));

const handleFormSubmit = {};
addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;
  const cardData = { name, link };
  const viewCard = createCard(cardData);
  renderCard(viewCard, cardListEl);
  close(addCardModal);
  e.target.reset();
});

// modalImageCloseBtn.addEventListener("click", () => close(previewImageModal));

export const createCard = (cardData) => {
  const card = new Card(cardData, cardSelector, handleImageClick);
  return card.getView();
};

// initialCards.reverse().forEach((cardData) => {
//   const cardView = createCard(cardData);
//   renderCard(cardView, cardListEl);
// });

//instantiations

const profileEditFormValidator = new FormValidator(config, profileEditForm);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();

const newCardPopup = new PopupWithForm("#add-card-modal", () => {});
// newCardPopup.open();
// newCardPopup.close();
setEventListeners();

const editProfilePopup = new PopupWithForm("#profile-edit-modal", () => {});
// editProfilePopup.open();
// editProfilePopup.close();
setEventListeners();

const popupImage = new PopupWithImage(data);
popupImage.setEventListeners();
