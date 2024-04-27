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

  _showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.classList.remove(this._errorClass);
    errorMessageEl.textContent = "";
  }

  _checkInputValidity(formEl, inputEl, config) {
    if (!inputEl.validity.valid) {
      return this._showInputError(formEl, inputEl, config);
    } else {
      this._hideInputError(formEl, inputEl, config);
    }
  }

  _handleDisableButton(submitButton, inactiveButtonClass) {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _handleEnableButton(submitButton, inactiveButtonClass) {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _hasInvalidInput() {
    return !this._inputEls.every((inputEl) => inputEl.validity.valid);
  }

  _toggleButtonState(inputEls, submitButtonSelector, { inactiveButtonClass }) {
    if (this._hasInvalidInput(inputEls)) {
      this._handleDisableButton(
        this._submitButtonSelector,
        this._inactiveButtonClass
      );
      return;
    }
    this._handleEnableButton(
      this._submitButtonSelector,
      this._inactiveButtonClass
    );
  }

  _setEventListeners() {
    this._submitButton = this._formEl.querySelector(this._submitButtonSelector);
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (evt) => {
        this._checkInputValidity(this._formEl, inputEl, this._config);
        this._toggleButtonState(
          this._inputEls,
          this._submitButton,
          this._config
        );
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
