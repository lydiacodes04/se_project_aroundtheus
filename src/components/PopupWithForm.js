import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
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
    this._inputElements = this._popupForm.querySelectorAll(".modal__input");
    //collects data from all the input fields and returns it as an object.
    // "#profile-title-input", "#profile-description-input", "#card-title-input","#card-image-input"
    //passes data to the submission handler as an argument.

    //create object, iterate through input elements for each input element, assign a key-value pair to the obj
    //key needs to be input Elements name attribute
    //return

    handleProfileEditSubmit(this._inputValues);
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", () => {
      this.handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}
