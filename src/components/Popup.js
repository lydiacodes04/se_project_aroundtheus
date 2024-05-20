export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".modal__close");
    // this._handleEscClose
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", close);
    this._popupElement.addEventListener("mousedown", close);
  }
  //replaces:
  // function open(modal) {
  //   modal.classList.add("modal_opened");
  //   document.addEventListener("keydown", closeModalEscape);
  //   modal.addEventListener("mousedown", closeModalOverlay);
  // }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", close);
    this._popupElement.removeEventListener("mousedown", close);
    this._popupElement.setEventListeners();
  }
  //replaces:
  // function close(modal) {
  //   modal.classList.remove("modal_opened");
  //   document.removeEventListener("keydown", closeModalEscape);
  //   modal.removeEventListener("mousedown", closeModalOverlay);
  // }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
    //replaces
    // function closeModalEscape(evt) {
    //   if (evt.key === "Escape") {
    //     const modalOpened = document.querySelector(".modal_opened");
    //     modalOpened.close();
    //   }
    // }
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", () => {
      if (evt.target === this._popupElement) {
        this._popupElement.close();
      }
    });

    this._closeButton.addEventListener("click", close);
    // return this._popupElement;
  }
}

//replaces
//function closeModalOverlay(evt) {
//   if (evt.target === evt.currentTarget) {
//     evt.currentTarget.close();
//   }
// }
