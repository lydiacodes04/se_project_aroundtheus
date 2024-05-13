export class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    // items is an array of data
    this._renderer = renderer;
    //renderer is a function that creates and adds a single item to the page
  }

  renderItems() {
    //renders all elements on the page
    //iterates through the items array and call the renderer() function on each item.
    // This method should be called once on page load.
  }

  addItem() {
    //takes a DOM element and adds it to the container.
    //This method should be called when adding an individual card to the DOM.
  }
}
