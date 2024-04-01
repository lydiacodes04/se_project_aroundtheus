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

// ELEMENTS
const profileEditButton = document.querySelector(".profile__edit-button");

const profileEditModal = document.querySelector("#profile-edit-modal");

const addNewCardButton = document.querySelector(".profile__add-button");

const addCardModal = document.querySelector("#add-card-modal");

const profileModalCloseButton = profileEditModal.querySelector(
  "#profile-close-button"
);
const addCardModalCloseButton = addCardModal.querySelector(
  "#add-card-close-button"
);

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileEditForm = profileEditModal.querySelector(
  "#profile-edit-modal-form"
);

const cardListEl = document.querySelector(".cards__list");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardInput = document.querySelector("#add-card-modal");

const cardTitleInput = document.querySelector("#card-title-input");
const cardImageInput = document.querySelector("#card-image-input");

const trashButton = cardTemplate.querySelector(".card__trash-button");

const previewImageModal = cardTemplate.querySelector("#modal__image-container");
const previewImageElement = cardTemplate.querySelector(".modal__image-preview");

// FUNCTIONS
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function renderInitialCards(cardEl, container) {
  container.append(cardEl);
}

function renderCard(cardEl, container) {
  container.prepend(cardEl);
}
// function deleteCard(cardElement) {
//   cardElement.remove();
// }

//I renamed this function from getCardElement to getCardView to match the video
function getCardView(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  const likeButton = cardElement.querySelector(".card__like-button");
  //handleLikeIcon
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  //handleDeleteCard
  trashButton.addEventListener("click", () => deleteCard(cardElement));

  //handlePreviewPicture
  cardImageEl.addEventListener("click", function () {
    previewImageElement.src = cardData.link;
    previewImageElement.alt = cardData.name;
    previewImageElement.textContent = cardData.name;
    openModal(previewImageElement);
  });

  //NEXT STEPS:

  //openModal with previewImageModal -->create 3rd popup
  // find image element inside popup
  //replace src with card link
  // replace alt with card title

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
  const cardView = getCardView({
    name,
    link,
  });
  renderCard(cardView, cardListEl);
  closeModal(addCardModal);
});

//initial cards
initialCards.forEach(function (cardData) {
  const cardView = getCardView(cardData);
  renderInitialCards(cardView, cardListEl);
});
