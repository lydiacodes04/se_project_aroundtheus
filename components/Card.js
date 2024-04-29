export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this.name = data.name;
    this.link = data.link;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");

    this._likeButton.addEventListener("click", this._handleLikeButton);

    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleLikeButton = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

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
