export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(
      (res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      }
    );
  }
  addCard() {
    fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      authorization: "119b16d3-4721-4c28-968f-5c9b08f91550",
      "Content-Type": "application/json",
      method: "POST",
      body: JSON.stringify({ name: this.name, link: this.link }),
    });
  }
}

//  editProfile() {
//    // fetch request to edit the user profile
//  }

Promise.all([Api.getInitialCards, Api.getUser, Api.addCard]).then((values) => {
  console.log(values);
});
