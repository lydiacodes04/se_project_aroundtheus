const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

function enableValidation(config) {
  const formEls = [...document.querySelectorAll(config.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    const submitButtonSelector = document.querySelector(
      config.submitButtonSelector
    );
    setEventListeners(formEl, config, submitButtonSelector);
  });
}

enableValidation(config);

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

const disableButton = (submitButtonSelector, inactiveButtonClass) => {
  submitButtonSelector.classList.add(inactiveButtonClass);
  submitButtonSelector.disabled = true;
};

const enableButton = (submitButtonSelector, inactiveButtonClass) => {
  submitButtonSelector.remove(config.inactiveButtonClass);
  submitButtonSelector.disabled = false;
};

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

function toggleButtonState(
  inputEls,
  submitButtonSelector,
  { inactiveButtonClass }
) {
  if (hasInvalidInput(inputEls)) {
    disableButton(submitButtonSelector, inactiveButtonClass);
    return;
  }
  enableButton(submitButtonSelector, inactiveButtonClass);
}

function setEventListeners(formEl, config, submitButtonSelector) {
  const { inputSelector } = config;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (evt) => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputEls, submitButtonSelector, config);
    });
  });
}
