import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor({ data }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  // data should be an object containing the name and link
  open(data) {
    this._image.src = data.link;
    this._image.alt = data.name;
    this._image.textContent = data.name;
    super.open();
  }
}
