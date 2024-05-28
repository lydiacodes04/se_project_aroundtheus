class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1", {
      headers: {
        authorization: "119b16d3-4721-4c28-968f-5c9b08f91550",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });

    // other methods for working with the API
    // Promise.all(getUserInfo, getInitialcards, etc.) {
    // }
  }
}
//note from Max's video
// define your variable that you will pass into the fetch request body
//    const myObj = {
//     name: "Abe Lincoln",
//     job: "president"
//   }
//  // next write out the fetch request:
//   fetch("https://www.somewebsite.com", {
//   method: "POST",
//   body: JSON.stringify(myObj),
//   })

//note from flagship video
// class JSONPlaceHolderClient {
//   constructor() {
//     this._baseUrl = "https://jsonplaceholder.typicode.com";
//   }
//   getPosts() {
//     return fetch(`${this._baseUrl}/posts`);
//   }
//   getPostsbyId(id) {
//     return fetch(`${this._baseUrl}/posts/${id}`);
//   }
// }
// in index.js, call the function

// const jsonClient = new JSONPlaceholderClient();
// jsonClient.getPosts()
//     .then((response) => response.json())
//     .then(posts => console.log(posts));

//another shortcut JSdoc comments

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "119b16d3-4721-4c28-968f-5c9b08f91550",
    "Content-Type": "application/json",
  },
});
