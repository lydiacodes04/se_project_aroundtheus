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
    this.isLiked = data.isLiked;
  }

  updateIsLiked(isLiked) {
    this.isLiked = isLiked;
    this.renderLikes();
  }

  renderLikes() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._trashButton = this._cardElement.querySelector(".card__trash-button");

    this._likeButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target === this._likeButton) {
        this._handleLikeButton(this);
      }
    });

    this._trashButton.addEventListener("click", () => {
      this._handleDeleteCard(this.cardID);
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });
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
    this.renderLikes();
    this._setEventListeners();
    return this._cardElement;
  }
}
