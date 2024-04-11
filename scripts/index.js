const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// MODALS
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#image-preview-modal");

//MODAL COMPONENTS
const profileEditForm = document.querySelector("#profile-edit-modal-form");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//MAIN PAGE BUTTONS
const profileEditButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

//MODAL BUTTONS
const profileModalCloseButton = profileEditModal.querySelector(
  "#profile-close-button"
);
const addCardModalCloseButton = addCardModal.querySelector(
  "#add-card-close-button"
);
const modalImageCloseBtn = previewImageModal.querySelector(
  "#modal__image-close-button"
);

const closeButtons = document.querySelectorAll(".modal__close");

//TEMPLATES
const previewImageElement = previewImageModal.querySelector(
  ".modal__image-element"
);
const previewImageElementTitle = previewImageModal.querySelector(
  ".modal__image-caption"
);

//NODES AND INPUTS
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardInput = document.querySelector("#add-card-modal");
const cardTitleInput = document.querySelector("#card-title-input");
const cardImageInput = document.querySelector("#card-image-input");

// FUNCTIONS

// function toggleModal(modal) {
//   modal.classList.toggle("modal_opened");
// }

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEscape);
  modal.addEventListener("mousedown", closeModalOverlay);
}

function closeModalOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function closeModalEscape(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closeModal(modalOpened);
  }
}

// function closeModalListener(modal) {
//   document.addEventListener("click", (evt) => {
//     const isClickInsideModal = evt.target.includes(".modal__container");
//     if (!isClickInsideModal) {
//       toggleModal(modal);
//     }
//   });
// }

// document.addEventListener("keydown", (evt) => {
//   // const modal = document.querySelector(".modal__form");
//   if (evt.key === "Escape") {
//     closeModal(modal);
//   }
// });

function renderCard(cardEl, container) {
  container.prepend(cardEl);
}

function generateCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");

  const cardTitleEl = cardElement.querySelector(".card__title");
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  const trashButton = cardElement.querySelector(".card__trash-button");
  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImageElement.src = cardData.link;
    previewImageElement.alt = cardData.name;
    previewImageElementTitle.textContent = cardData.name;
    openModal(previewImageModal);
  });

  return cardElement;
}

//EVENT HANDLERS
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

//EVENT LISTENERS
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addNewCardButton.addEventListener("click", () => openModal(addCardModal));

addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

addCardModal.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;
  const cardView = generateCard({
    name,
    link,
  });

  renderCard(cardView, cardListEl);
  closeModal(addCardModal);
  e.target.reset();
});

modalImageCloseBtn.addEventListener("click", () =>
  closeModal(previewImageModal)
);

// This is where I am trying to get the modal to close if you click outside the modal

// const modal = document.querySelector(".modal__form");

// document.addEventListener("click", (evt) => {
//   // console.log("evt", evt);
//   const isClickInsideModal = modal.contains(evt.target);
//   // console.log("isClickInsideModal", isClickInsideModal);
//   // if (!isClickInsideModal) {
//   //   toggleModal(modal);
//   // }
// });

// profileEditModal, addCardModal, previewImageModal

//initial cards
initialCards.reverse().forEach(function (cardData) {
  const cardView = generateCard(cardData);
  renderCard(cardView, cardListEl);
});
