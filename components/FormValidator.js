export default class FormValidator {
  constructor(config, formEl) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formEl = formEl;
    this._config = config;
    this._inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.classList.remove(this._errorClass);
    errorMessageEl.textContent = "";
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return showInputError(inputEl);
    } else {
      hideInputError(inputEl);
    }
  }

  _handleDisableButton() {
    this._submitButtonSelector
      .querySelector(".modal__save")
      .classList.add(this._inactiveButtonClass);
    this._submitButtonSelector.disabled = true;
  }

  _handleEnableButton() {
    this._submitButtonSelector
      .querySelector(".modal__save")
      .classList.remove(this._inactiveButtonClass);
    this._submitButtonSelector.disabled = false;
  }

  //original
  // _hasInvalidInput(inputList) {
  //   return !inputList.every((inputEl) => inputEl.validity.valid);
  // }
  //note: I changed inputList to inputEls

  _hasInvalidInput() {
    return !this._inputEls.every((inputEl) => inputEl.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput === true) {
      _handleDisableButton();
      return;
    }
    _handleEnableButton();
  }

  _setEventListeners() {
    this._submitButton = this._formEl.querySelector(this._submitButtonSelector);
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (evt) => {
        inputEl._checkInputValidity();
        _toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formEls = [...document.querySelectorAll(this._formSelector)];
    this._formEls.forEach((formEl) => {
      formEl.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    });
  }
}

// if card form submitted successfully, clear form fields and (reset) disable submit button
// if closed before successful submit, leave the form fields as they are, so as to prevent lost data.
