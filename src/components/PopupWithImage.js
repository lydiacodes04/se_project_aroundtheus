import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, data) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._previewImageElement = this._popupElement.querySelector(
      ".modal__image-element"
    );
    this._previewImageElementTitle = this._popupElement.querySelector(
      ".modal__image-caption"
    );
  }

  // data should be an object containing the name and link
  open(data) {
    this._previewImageElement.src = data.link;
    this._previewImageElement.alt = data.name;
    this._previewImageElementTitle.textContent = data.name;
    super.open();
  }
}
