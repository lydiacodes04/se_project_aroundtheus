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
const trashButton = document.querySelector(".card__trash-button");

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
  api.editProfile(inputValues.name, inputValues.about).then((data) => {
    userInfo.setUserInfo(data.name, data.about);
    profileEditPopup.close();
  });
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

//card generating functions
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

function renderCards(dataItem) {
  const card = new Card(dataItem, "#card-template", handleImageClick);
  const cardElement = card.getView();
  section.addItem(cardElement);
  newCardPopup.close();
  newCardPopup.reset();
  addCardFormValidator.handleDisableButton();
}

//SUBMIT handlers
function handleAddCardFormSubmit(data) {
  const { name, link } = data;
  const cardData = { name: name, link: link };
  api
    .addCard(name, link)
    .then((data) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
      newCardPopup.close();
      newCardPopup.reset();
      addCardFormValidator.handleDisableButton();
    })
    .catch((error) => {
      console.error("Error adding card:", error);
    });
}

function handleDeleteCardFormSubmit(cardID) {
  api.deleteRequest(cardID);
}
// _confirmDelete() {
//   this._deleteCardPopup.addEventListener("submit", () => {
//  this._handleDeleteCard(this);
// });
// // this._submitButton = this._deleteCardPopup.querySelector(".modal__save");
// // this._submitButton.addEventListener("submit", () => {
// //   this._handleDeleteCard(this);
// // });
// }

//instantiations
const profileEditFormValidator = new FormValidator(config, profileEditForm);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();

const eliminateMe = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
];

const section = new Section(
  {
    items: eliminateMe,
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

export const deleteCardPopup = new PopupWithForm(
  "#delete-card-modal",
  handleDeleteCardFormSubmit
);
deleteCardPopup.setEventListeners();

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
      renderCards(dataItem);
    });
  })
  .catch((err) => console.error(err));

api.getUser().then((inputValues) => {
  userInfo.setUserInfo(inputValues.name, inputValues.about);
});

// api.deleteRequest(cardID).then((res) => {
//   const card = new Card(dataItem, "#card-template", handleImageClick);
// });
