// import { deleteCardPopup } from "../pages/index.js";

export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLikeButton
  ) {
    this.name = data.name;
    this.link = data.link;
    this.cardID = data._id;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeButton = handleLikeButton;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._trashButton = this._cardElement.querySelector(".card__trash-button");

    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton(this._likeButton, this.cardID);
    });

    this._trashButton.addEventListener("click", () => {
      this._handleDeleteCard(this.cardID);
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  // _handleLikeButton = () => {
  //   this._likeButton.classList.toggle("card__like-button_active");
  // };

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
