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
    fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
      }),
    });
  }
  editProfile() {
    fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
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
