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
  //replaces:
  // function open(modal) {
  //   modal.classList.add("modal_opened");
  //   document.addEventListener("keydown", closeModalEscape);
  //   modal.addEventListener("mousedown", closeModalOverlay);
  // }

  close() {
    this._popupElement.classList.remove("modal_opened");
    // document.removeEventListener("keydown", closeModalEscape);
  }
  //replaces:
  // function close(modal) {
  //   modal.classList.remove("modal_opened");
  //   document.removeEventListener("keydown", closeModalEscape);
  //   modal.removeEventListener("mousedown", closeModalOverlay);
  // }
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
