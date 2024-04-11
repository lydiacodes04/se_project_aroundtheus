// The majority of this code is what I wrote following along with the video

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}
function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.classList.remove(errorClass);
  errorMessageEl.textContent = "";
}

function checkInputValidity(formEl, inputEl, config) {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
}

const disableButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
};

const enableButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
};

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    disableButton(submitButton, inactiveButtonClass);
    return;
  }
  enableButton(submitButton, inactiveButtonClass);
}

function setEventListeners(formEl, config) {
  const { inputSelector } = config;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(".modal__save");
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (evt) => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputEls, submitButton, config);
    });
  });
}

function enableValidation(config) {
  const formEls = [...document.querySelectorAll(config.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formEl, config);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
