import {
  config,
  profileEditForm,
  addCardForm,
  profileEditButton,
  addNewCardButton,
  previewImageElement,
  previewImageElementTitle,
  profileTitleInput,
  profileDescriptionInput,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/API.js";
import { data } from "autoprefixer";

//API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "119b16d3-4721-4c28-968f-5c9b08f91550",
    contentType: "application/json",
  },
});

//Getting and displaying cards

let section;
api
  .getInitialCards()
  .then((cardData) => {
    section = new Section(
      { items: cardData, renderer: renderCards },
      ".cards__list"
    );
    section.renderItems(cardData);
  })
  .catch((err) => console.error(err));

function handleImageClick(data) {
  popupImage.open(data);
}
addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

function renderCards(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteCard
  );
  return card.getView();
  // const cardElement = card.getView();
  // newCardPopup.close();
  // newCardPopup.reset();
  // addCardFormValidator.handleDisableButton();
}

function handleAddCardFormSubmit(data) {
  const cardData = { name: data.name, link: data.link };
  api
    .addCard(data)
    .then((data) => {
      const cardElement = renderCards(cardData);
      section.addItem(cardElement);
      newCardPopup.close();
      newCardPopup.reset();
      addCardFormValidator.handleDisableButton();
    })
    .catch((error) => {
      console.error("Error adding card:", error);
    });
}

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

//Profile creation and editing
const userInfo = new UserInfo(".profile__title", ".profile__description");

api.getUser().then((inputValues) => {
  userInfo.setUserInfo(inputValues.name, inputValues.about);
});
function handleProfileEditSubmit(inputValues) {
  api.editProfile(inputValues.name, inputValues.about).then((data) => {
    userInfo.setUserInfo(data.name, data.about);
    profileEditPopup.close();
  });
}

profileEditButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  profileTitleInput.value = data.name;
  profileDescriptionInput.value = data.about;
  profileEditPopup.open();
});

//DELETING CARDS
function handleDeleteCardFormSubmit(cardID) {
  api.deleteRequest(cardID);
}
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileEditPopup.setEventListeners();

const deleteCardPopup = new PopupWithForm(
  "#delete-card-modal",
  handleDeleteCardFormSubmit
);
deleteCardPopup.setEventListeners();

function handleDeleteCard() {
  deleteCardPopup.open();
  deleteCardPopup.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
}

//FORM VALIDATION

const profileEditFormValidator = new FormValidator(config, profileEditForm);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();
