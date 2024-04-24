export default class FormValidator {
  constructor(config, formInputEl) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._formInputEl = formInputEl;
  }

  _checkInputValidity() {
    this._formInputEl = formInputEl.validity.valid;
    return this._formInputEl;
  }

  _handleDisableButton() {
    this.submitButton
      .querySelector(".modal__save")
      .classList.toggle(this.inactiveButtonClass);
    this.submitButton.disabled = true;
  }

  _handleEnableButton() {
    this.submitButton
      .querySelector(".modal__save")
      .classList.toggle(this.inactiveButtonClass);
    this.submitButton.disabled = false;
  }

  _toggleButtonState() {
    if ((this.hasValidInput = true)) {
      _handleEnableButton();
    } else {
      _handleDisableButton();
    }
  }

  enableValidation() {
    formEls.forEach((formEl) => {
      formEl._checkInputValidity();
      evt.preventDefault();
      this._toggleButtonState();
    });
  }
}

//   resetForm() {
//     if ((this.hasInValidInput = true)) {
//     _toggleButtonState();
//   }
// }

// if card form submitted successfully, clear form fields and (reset) disable submit button
// if closed before successful submit, leave the form fields as they are, so as to prevent lost data.

// settings object:stores selectors and form classes
//// form element to be validated
