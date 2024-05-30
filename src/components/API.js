export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //CARD ROUTE: get all the cards (GET)
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
  // USER ROUTE: get current user's info (GET)
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
  //CARD ROUTE: create a card (POST)
  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: "119b16d3-4721-4c28-968f-5c9b08f91550",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Rio",
        link: "https://media.istockphoto.com/id/518230906/photo/christ-the-redeemer-in-rio-de-janeiro.jpg?s=1024x1024&w=is&k=20&c=zjtXz3bzlh5W3OP16aSRao9KdY9p_rk76KK4eFgubxA=",
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  //USER ROUTE: edit/update your profile info (PATCH)
  // editProfile() {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     method: "PATCH",
  //     headers: {
  //       authorization: "119b16d3-4721-4c28-968f-5c9b08f91550",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: "Lydia Lockhart",
  //       about: "Software Developer",
  //     }),
  //   });
  // }

  // renderAll() {
  //   Promise.all([Api.getInitialCards, Api.getUser, Api.addCard]).then(
  //     (values) => {
  //       console.log(values);
  //     }
  //   );
  // }
}
