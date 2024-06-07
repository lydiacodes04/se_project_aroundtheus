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
import PopupWithAvatar from "../components/PopupWithAvatar.js";

//API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "119b16d3-4721-4c28-968f-5c9b08f91550",
    "content-type": "application/json",
  },
});

//Getting and displaying cards

let section;
api
  .getInitialCards()
  .then((cardData) => {
    section = new Section(
      {
        items: cardData,
        renderer: (cardData) => {
          const cardElement = createCard(cardData);
          section.addItem(cardElement);
        },
      },
      ".cards__list"
    );
    section.renderItems();
  })
  .catch((err) => console.error(err));

function handleImageClick(data) {
  popupImage.open(data);
}
addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteCard,
    handleLikeButton
  );
  const cardElement = card.getView();
  return cardElement;
}

function handleAddCardFormSubmit(data) {
  const cardData = { name: data.name, link: data.link };
  api
    .addCard(data.name, data.link)
    .then((data) => {
      const cardElement = createCard(data);
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

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileEditPopup.setEventListeners();

const deleteCardPopup = new PopupWithForm(
  "#delete-card-modal",
  handleDeleteCard
);

function handleDeleteCard(cardID) {
  deleteCardPopup.open();
  api.deleteRequest(cardID);
}

function handleLikeButton(likeButton, likedStatus, cardID) {
  if (likedStatus) {
    api
      .removeLike(cardID)
      .then(() => {
        likeButton.classList.remove("card__like-button_active");
      })
      .catch((error) => console.error("Error removing like:", error));
  } else {
    api
      .addLike(cardID)
      .then(() => {
        likeButton.classList.add("card__like-button_active");
      })
      .catch((error) => console.error("Error adding like:", error));
  }
}

//FORM VALIDATION
const profileEditFormValidator = new FormValidator(config, profileEditForm);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();

const profileAvatar = document.querySelector(".profile__avatar");

const avatarEditPopup = new PopupWithAvatar(
  "#edit-avatar-modal",
  handleAvatarSubmit
);
avatarEditPopup.setEventListeners();

profileAvatar.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    avatarEditPopup.open();
  }
});

function handleAvatarSubmit(link) {
  avatarEditPopup.getInputLink(link);
  api
    .updateAvatar(link)
    .then((res) => {
      profileAvatar.replace(profileAvatar.url, res);
      return profileAvatar.url;
    })
    .catch((err) => console.error(err));
}
