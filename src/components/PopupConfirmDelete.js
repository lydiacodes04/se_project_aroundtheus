import Popup from "./Popup.js";

export default class PopupConfirmDelete extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this.handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupElement.querySelector(".modal__save");
  }

  confirmDelete(cardID) {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", () => {
      this.handleFormSubmit(cardID);
    });
  }
}
