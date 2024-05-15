import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(formSelector, handleFormSubmit) {
    super({ formSelector });
    this._popupForm = this._formElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  // data should be an object containing the name and link
  open(data) {
    // this._data = data;
    this._src = data.link;
    this._alt = data.name;
    this._textContent = data.name;
    super.open();
  }
}
