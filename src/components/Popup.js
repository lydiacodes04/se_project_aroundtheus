export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".modal__close");
    // this._handleEscClose
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    // document.removeEventListener("keydown", closeModalEscape);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    // document.removeEventListener("keydown", closeModalEscape);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", close);

    // if (evt.target === this._popupElement) {
    //   this._popupElement.addEventListener("click", close);
    // }
    return this._popupElement;
  }
}
