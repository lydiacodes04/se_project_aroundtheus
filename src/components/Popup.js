import { config } from "../pages/index.js";

export default class Popup {
  constructor({ formSelector }) {
    this._formElement = document.querySelector(formSelector);
  }

  open() {
    this._formElement.classList.add("modal_opened");
  }

  close() {
    this._formElement.classList.remove("modal_opened");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton = this._formElement.querySelector(".modal__close");
    this._closeButton.addEventListener("click", close);

    this._evt.target = evt.currentTarget;
    this._evt.target.addEventListener("click", close);

    this.setEventListeners();
    return this._formElement;
  }
}
