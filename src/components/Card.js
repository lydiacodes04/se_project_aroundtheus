import { deleteCardPopup } from "../pages/index.js";

export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this.name = data.name;
    this.link = data.link;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._trashButton = this._cardElement.querySelector(".card__trash-button");
    // this._submitButton = this._popupElement.querySelector(".modal__save");

    this._likeButton.addEventListener("click", this._handleLikeButton);

    this._trashButton.addEventListener("click", () => {
      console.log("you clicked the trash icon");
      //old code, immediate delete the card
      // this._handleDeleteCard();
      //new card, let's open the deleteCardPopup first to make sure you really wanna delete the card
      this._openDeleteCardPopup();
    });

    // this._submitButton.addEventListener("click", () => {
    //   console.log("you clicked the YES button");
    // });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleLikeButton = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  _openDeleteCardPopup() {
    this._deleteCardPopup = deleteCardPopup;
    this._deleteCardPopup.open();
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._element = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardImageEl.src = this.link;
    this._cardImageEl.alt = this.name;
    this._cardTitleEl.textContent = this.name;

    this._setEventListeners();
    return this._cardElement;
  }
}
