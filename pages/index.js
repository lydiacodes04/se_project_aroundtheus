import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const config = {
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

// Refactor toggleModal(modal) to closeModal() and openModal()

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEscape);
  modal.removeEventListener("mousedown", closeModalOverlay);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEscape);
  modal.addEventListener("mousedown", closeModalOverlay);
}

function closeModalOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function closeModalEscape(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closeModal(modalOpened);
  }
}

function renderCard(cardEl, container) {
  container.prepend(cardEl);
}

function handleImageClick(data) {
  previewImageElement.src = data.link;
  previewImageElement.alt = data.name;
  previewImageElementTitle.textContent = data.name;
  openModal(previewImageModal);
}

//EVENT HANDLERS
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

//EVENT LISTENERS
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addNewCardButton.addEventListener("click", () => {
  // const inputEls = Array.from(addCardForm.querySelectorAll("input"));
  // const submitButton = addCardForm.querySelector("button");
  // const ibc = { inactiveButtonClass: "modal__save_disabled" };
  // toggleButtonState(inputEls, submitButton, ibc);
  openModal(addCardModal);
});

addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;
  const cardData = { name, link };
  const viewCard = createCard(cardData);
  renderCard(viewCard, cardListEl);
  closeModal(addCardModal);
  e.target.reset();
});

modalImageCloseBtn.addEventListener("click", () =>
  closeModal(previewImageModal)
);

const createCard = (cardData) => {
  const card = new Card(cardData, cardSelector, handleImageClick);
  return card.getView();
};

initialCards.reverse().forEach((cardData) => {
  const cardView = createCard(cardData);
  renderCard(cardView, cardListEl);
});

const profileEditFormValidator = new FormValidator(config, profileEditForm);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();
