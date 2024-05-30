import { config, initialCards } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/API.js";
import { data } from "autoprefixer";

//FORMS
const profileEditForm = document.forms["profile-edit-modal-form"];
const addCardForm = document.querySelector("#add-card-form");

//MAIN PAGE BUTTONS
const profileEditButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

//PREVIEW IMAGE EL
const previewImageElement = document.querySelector(".modal__image-element");
const previewImageElementTitle = document.querySelector(
  ".modal__image-caption"
);
//profile inputs
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

//EVENT HANDLERS
function handleImageClick(data) {
  popupImage.open(data);
}

function handleProfileEditSubmit(inputValues) {
  userInfo.setUserInfo(inputValues.name, inputValues.about);
  profileEditPopup.close();
}

// //EVENT LISTENERS
profileEditButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  profileTitleInput.value = data.name;
  profileDescriptionInput.value = data.about;
  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

// functions
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

function handleAddCardFormSubmit(data) {
  const { name, link } = data;
  const cardData = { name: name, link: link };
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
  newCardPopup.close();
  newCardPopup.reset();
  addCardFormValidator.handleDisableButton();
}

//instantiations
const profileEditFormValidator = new FormValidator(config, profileEditForm);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();

const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
    },
  },
  ".cards__list"
);

section.renderItems();

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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "119b16d3-4721-4c28-968f-5c9b08f91550",
    contentType: "application/json",
  },
});

api
  .getInitialCards()
  .then((data) => {
    data.forEach((dataItem) => {
      const card = new Card(dataItem, "#card-template", handleImageClick);
      const cardElement = card.getView();
    });
  })
  .catch((err) => console.error(err));

// api.getUser();
// api.addCard();
// api.editProfile();
