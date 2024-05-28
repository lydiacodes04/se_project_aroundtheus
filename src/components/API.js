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
  // other methods for working with the API
  // Promise.all(getUserInfo, getInitialcards, etc.) {
  // }
  getInitialCardsbyList(initialCards) {
    return fetch(`${this._baseUrl}/initialCards`, {
      method: "GET",
      body: JSON.stringify(initialCards),
    });
  }
}

//   })

// //note from flagship video
// // class JSONPlaceHolderClient {
// //   constructor() {
// //     this._baseUrl = "https://jsonplaceholder.typicode.com";
// //   }
// //   getPosts() {
// //     return fetch(`${this._baseUrl}/posts`);
// //   }
// //   getPostsbyId(id) {
// //     return fetch(`${this._baseUrl}/posts/${id}`);
// //   }
// // }
