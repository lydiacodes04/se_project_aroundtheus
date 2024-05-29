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

  // _handleFetch(res) {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //   return Promise.reject(`Error: ${res.status}`);
  // }
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
}
// addCard() {
//   // fetch request to add a new card
//  }

//  editProfile() {
//    // fetch request to edit the user profile
//  }
// other methods for working with the API
// Promise.all(getUserInfo, getInitialcards, etc.) {
// }

//   })
