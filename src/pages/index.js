import { config, initialCards } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

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

//TEMPLATES
//CARDS
const cardSelector = "#card-template";
const cardListEl = document.querySelector(".cards__list");

//PREVIEW IMAGE EL
const previewImageElement = previewImageModal.querySelector(
  ".modal__image-element"
);
const previewImageElementTitle = previewImageModal.querySelector(
  ".modal__image-caption"
);

//NODES AND INPUTS
//PROFILE TITLE/DESCRIPTION
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// const user = { profileTitle, profileDescription };

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// function renderCard(cardEl, container) {
//   container.prepend(cardEl);
// }

//EVENT HANDLERS
function handleImageClick(data) {
  popupImage.open(data);
}

function handleProfileEditSubmit(inputValues) {
  userInfo.setUserInfo(inputValues.title, inputValues.description);
  profileEditPopup.close();
}

// //EVENT LISTENERS
profileEditButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  profileTitleInput.value = data.title;
  profileDescriptionInput.value = data.job;
  //use name and about
  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

const handleAddCardFormSubmit = (e) => {
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;

  const cardData = { name, link };
  const viewCard = createCard(cardData);
  // renderCard(viewCard, cardListEl);
  newCardPopup.close();
  e.target.reset();
};

// addCardForm.addEventListener("submit", handleFormSubmit);

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

const popupImage = new PopupWithImage("#image-preview-modal", {
  previewImageElement,
  previewImageElementTitle,
});
popupImage.setEventListeners();

const newCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
newCardPopup.setEventListeners();

const userInfo = new UserInfo(".profile__title", ".profile__description");

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileEditPopup.setEventListeners();
