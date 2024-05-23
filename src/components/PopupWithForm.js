import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupElement.querySelector(".modal__save");
  }

  close() {
    super.close();
  }

  _getInputValues() {
    this._inputElements = this._popupForm.querySelectorAll(".modal__input");
    const inputValues = {};

    this._inputElements.forEach((inputEl) => {
      inputValues[inputEl.name] = inputEl.value;
    });
    return inputValues;
  }

  reset() {
    this._popupForm.reset();
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());
      this._popupForm.reset();
      // this._popupForm.resetValidation();
    });
    // this._popupForm.addEventListener("submit", () => {
    //   this._popupForm.toggleButtonState();
    // });
    super.setEventListeners();
  }
}
