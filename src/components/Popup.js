export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton = this._popupElement.querySelector(".modal__close");
    this._closeButton.addEventListener("click", close);

    this._evt.target = evt.currentTarget;
    this._evt.target.addEventListener("click", close);

    this.setEventListeners();
    return this._popupElement;
  }
}
