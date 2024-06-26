import {
  config,
  profileEditForm,
  addCardForm,
  editAvatarForm,
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
import PopupConfirmDelete from "../components/PopupConfirmDelete.js";

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
  .catch((err) => console.error("Error rendering cards:", err));

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
    handleDelete,
    handleLikeButton
  );
  const cardElement = card.getView();
  return cardElement;
}

function handleAddCardFormSubmit(data) {
  newCardPopup.renderLoading(true);
  api
    .addCard(data.name, data.link)
    .then((data) => {
      const cardElement = createCard(data);
      section.addItem(cardElement);
      newCardPopup.reset();
      addCardFormValidator.handleDisableButton();
      newCardPopup.close();
    })
    .catch((error) => {
      console.error("Error adding card:", error);
    })
    .finally(() => {
      newCardPopup.renderLoading(false);
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
const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

api
  .getUser()
  .then((inputValues) => {
    userInfo.setUserInfo(inputValues.name, inputValues.about);
    userInfo.setAvatar(inputValues.avatar);
  })
  .catch((err) => {
    console.error("Error getting user information:", err);
  });

function handleProfileEditSubmit(inputValues) {
  profileEditPopup.renderLoading(true);
  api
    .editProfile(inputValues.name, inputValues.about)
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about);
      profileEditPopup.close();
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
    })
    .finally(() => {
      profileEditPopup.renderLoading(false);
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

const deleteCardPopup = new PopupConfirmDelete("#delete-card-modal");
deleteCardPopup.setEventListeners();

function handleDelete(card) {
  deleteCardPopup.open();
  deleteCardPopup.setConfirmDelete(() => {
    api
      .deleteRequest(card.cardID)
      .then(() => {
        deleteCardPopup.close();
        card.removeCardElement();
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
      });
  });
}

function handleLikeButton(card) {
  if (card.isLiked) {
    api
      .removeLike(card.cardID)
      .then(() => {
        card.updateIsLiked(false);
      })
      .catch((error) => console.error("Error removing like:", error));
  } else {
    api
      .addLike(card.cardID)
      .then(() => {
        card.updateIsLiked(true);
      })
      .catch((error) => console.error("Error adding like:", error));
  }
}

//FORM VALIDATION
const profileEditFormValidator = new FormValidator(config, profileEditForm);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator(config, editAvatarForm);
editAvatarFormValidator.enableValidation();

const profileAvatar = document.querySelector(".profile__image-container");

profileAvatar.addEventListener("click", () => {
  avatarEditPopup.open();
});

const avatarEditPopup = new PopupWithForm(
  "#edit-avatar-modal",
  handleAvatarSubmit
);
avatarEditPopup.setEventListeners();

function handleAvatarSubmit({ link }) {
  avatarEditPopup.renderLoading(true);
  api
    .updateAvatar(link)
    .then(() => {
      userInfo.setAvatar(link);
      avatarEditPopup.close();
    })
    .catch((err) => {
      console.error("Error updating avatar:", err);
    })
    .finally(() => {
      avatarEditPopup.renderLoading(false);
    });
}
