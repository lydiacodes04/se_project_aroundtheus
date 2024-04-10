// Trying this on my own

// Make sure that the enableValidation() function accepts the following object
// with selectors required for form validation as an argument:

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// I have changed the formSelector, inputSelector, submitButtonSelector, and inactiveButtonClass
//from what was given to the names I use in my code
// the other classes in enableValidation will maintain their names
// as they are only added or removed during validation

const showInputError = (inputSelector, errorMessage) => {
  inputSelector.classList.add(inputErrorClass);
  inputErrorClass.textContent = errorMessage;
  inputErrorClass.classList.add(errorClass);
};

const hideInputError = (inputSelector) => {
  inputSelector.classList.remove(inputErrorClass);
  inputErrorClass.textContent = " ";
  inputErrorClass.classList.remove(errorClass);
};

const checkInputValidity = (formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) {
    showInputError(
      formSelector,
      inputSelector,
      inputSelector.validationMessage
    );
  } else {
    hideInputError(formSelector, inputSelector);
  }
};

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

const setEventListeners = (formSelector) => {
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener("input", () => {
      checkInputValidity(formSelector, inputSelector);
      closeModal(inputList, submitButtonSelector);
    });
    formSelector.addEventListener("mousedown" && "click", () => {
      toggleModal(inputList, submitButtonSelector);

      formSelector.addEventListener("keydown", function (evt) {
        if (evt.key === "Esc") {
          closeModal();
          submitButtonSelector.reset();
        }
      });
    });
  });
};

const hasInvalidInput = (inputList) => {
  // const inputList = Array.from(formSelector.querySelectorAll(".modal__input"));
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// TODO: Watch last part of video for enableValidation
function enableValidation(config) {
  const formEls = [...document.querySelectorAll(config.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formEl, config);
  });
}

enableValidation(config);
