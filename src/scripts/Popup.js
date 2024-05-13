export default class Popup {
  constructor({ formSelector }) {
    this._formElement = document.querySelector(formSelector);
  }

  open() {
    //opens popup
    this._formElement.classList.add("modal_opened");
  }

  close() {
    //closes popup
    this._formElement.classList.remove("modal_opened");
  }

  _handleEscClose(evt) {
    //listens for Esc button
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    //sets event listeners

    this._closeButton = this._formElement.querySelector(".modal__close");
    this._closeButton.addEventListener("click", close);

    this._evt.target = evt.currentTarget;
    this._evt.target.addEventListener("click", close);

    this.setEventListeners();
    return this._formElement;
  }
}
