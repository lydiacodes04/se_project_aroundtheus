import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    this._inputValues = document.querySelectorAll([(id$ = "-input")]);
    //collects data from all the input fields and returns it as an object.
    // "#profile-title-input", "#profile-description-input", "#card-title-input","#card-image-input"
    //passes data to the submission handler as an argument.

    handleProfileEditSubmit(this._inputValues);
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit");
    super.setEventListeners();
  }
}
