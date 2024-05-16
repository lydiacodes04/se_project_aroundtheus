import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  // data should be an object containing the name and link
  open(data) {
    this._src = data.link;
    this._alt = data.name;
    this._textContent = data.name;
    super.open();
  }
}
