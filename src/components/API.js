export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(
      (res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      }
    );
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
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: "119b16d3-4721-4c28-968f-5c9b08f91550",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  }
  editProfile() {
    fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: "119b16d3-4721-4c28-968f-5c9b08f91550",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Marie Skłodowska Curie",
        about: "Physicist and Chemist",
      }),
    });
  }
}

Promise.all([Api.getInitialCards, Api.getUser, Api.addCard]).then((values) => {
  console.log(values);
});
