export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const cardSelector = "#card-template";

export const initialCards = [
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

// // MODALS
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const addCardModal = document.querySelector("#add-card-modal");
export const previewImageModal = document.querySelector("#image-preview-modal");

// //MODAL COMPONENTS
// export const profileEditForm = document.querySelector(
//   "#profile-edit-modal-form"
// );
// export const addCardForm = document.querySelector("#add-card-form");

export const cardListEl = document.querySelector(".cards__list");
// export const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;

// //MAIN PAGE BUTTONS
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
const addNewCardButton = document.querySelector(".profile__add-button");

// //MODAL BUTTONS
// export const profileModalCloseButton = profileEditModal.querySelector(
//   "#profile-close-button"
// );
// export const addCardModalCloseButton = addCardModal.querySelector(
//   "#add-card-close-button"
// );
// export const modalImageCloseBtn = previewImageModal.querySelector(
//   "#modal__image-close-button"
// );

// export const closeButtons = document.querySelectorAll(".modal__close");

// //TEMPLATES
export const previewImageElement = previewImageModal.querySelector(
  ".modal__image-element"
);
export const previewImageElementTitle = previewImageModal.querySelector(
  ".modal__image-caption"
);

// //NODES AND INPUTS
// export const profileTitle = document.querySelector(".profile__title");
// export const profileDescription = document.querySelector(
//   ".profile__description"
// );

// export const profileTitleInput = document.querySelector("#profile-title-input");
// export const profileDescriptionInput = document.querySelector(
//   "#profile-description-input"
// );

// export const cardInput = document.querySelector("#add-card-modal");
// export const cardTitleInput = document.querySelector("#card-title-input");
// export const cardImageInput = document.querySelector("#card-image-input");
