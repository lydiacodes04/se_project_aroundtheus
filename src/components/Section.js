import { renderCard, createCard } from "../pages/index.js";

export class Section {
  constructor({ items: cardData, renderer: renderCard }, classSelector) {
    this._items = cardData;
    // items is an array of data
    this._renderer = renderCard;
    //renderer is a function that creates and adds a single item to the page
  }

  renderItems() {
    this._createCard(cardData);
    //renders all elements on the page
    //iterates through the items array and call the renderer() function on each item.
    // This method should be called once on page load.
  }

  addItem() {
    //takes a DOM element and adds it to the container.
    //This method should be called when adding an individual card to the DOM.
    initialCards.reverse().forEach((cardData) => {
      const cardView = createCard(cardData);
      renderCard(cardView, cardListEl);
    });
  }
}
