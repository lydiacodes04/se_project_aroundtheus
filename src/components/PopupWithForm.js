import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupElement.querySelector(".modal__save");
    this._submitButtonValue = this._submitButton.textContent;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = "Save";
    }
  }

  _getInputValues() {
    this._inputElements = this._popupForm.querySelectorAll(".modal__input");
    const inputValues = {};

    this._inputElements.forEach((inputEl) => {
      inputValues[inputEl.name] = inputEl.value;
    });
    return inputValues;
  }
  //suggestion
  //   setInputValues(data) {
  //       this._inputList.forEach((input) => {
  //         // here you insert the `value` by the `name` of the input
  //         input.value = data[input.name];
  //       });
  //     }

  reset() {
    this._popupForm.reset();
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}
