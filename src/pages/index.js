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

//EVENT HANDLERS
// function handleImageClick(data) {
//   popupImage.open(data);
// }

// function handleProfileEditSubmit(inputValues) {
//   api.editProfile(inputValues.name, inputValues.about).then((data) => {
//     userInfo.setUserInfo(data.name, data.about);
//     profileEditPopup.close();
//   });
// }

// //EVENT LISTENERS
// profileEditButton.addEventListener("click", () => {
//   const data = userInfo.getUserInfo();
//   profileTitleInput.value = data.name;
//   profileDescriptionInput.value = data.about;
//   profileEditPopup.open();
// });

// addNewCardButton.addEventListener("click", () => {
//   newCardPopup.open();
// });

//SUBMIT handlers

// function handleDeleteCardFormSubmit(cardID) {
//   api.deleteRequest(cardID);
// }

// const profileEditFormValidator = new FormValidator(config, profileEditForm);
// profileEditFormValidator.enableValidation();

// const addCardFormValidator = new FormValidator(config, addCardForm);
// addCardFormValidator.enableValidation();

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

function renderCards(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteCard
  );
  const cardElement = card.getView();
  section.addItem(cardElement);
  newCardPopup.close();
  newCardPopup.reset();
  addCardFormValidator.handleDisableButton();
}

const section = new Section(
  {
    items: cardData,
    renderer: renderCards(cardData),
  },
  ".cards__list"
);

section.renderItems();

// const userInfo = new UserInfo(".profile__title", ".profile__description");

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

// const profileEditPopup = new PopupWithForm(
//   "#profile-edit-modal",
//   handleProfileEditSubmit
// );
// profileEditPopup.setEventListeners();

// const deleteCardPopup = new PopupWithForm(
//   "#delete-card-modal",
//   handleDeleteCardFormSubmit
// );
// deleteCardPopup.setEventListeners();

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "119b16d3-4721-4c28-968f-5c9b08f91550",
    contentType: "application/json",
  },
});

api
  .getInitialCards()
  .then((cardData) => {
    // cardData.forEach((card) => {
    //   renderCards(card);
    // });
    //Is renderCards to render one card or all the cards? If all, we don't need the forEach loop
    renderCards(cardData);
  })
  .catch((err) => console.error(err));

api.getUser().then((inputValues) => {
  userInfo.setUserInfo(inputValues.name, inputValues.about);
});

// function handleDeleteCard() {
//   deleteCardPopup.open();
//   deleteCardPopup.addEventListener("submit", (evt) => {
//     evt.preventDefault();
//   });
// }
