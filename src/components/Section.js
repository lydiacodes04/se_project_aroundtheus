export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    // items is an array of data
    this._renderer = renderer;
    //renderer is a function that creates and adds a single item to the page
    this._container = document.querySelector(classSelector);
  }

  renderItems() {
    this._items.reverse().forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._container.prepend(item);
    //takes a DOM element and adds it to the container.
    //This method should be called when adding an individual card to the DOM.
  }
}
