export default class UserInfo {
  constructor(name, job) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  setUserInfo(name, job) {
    // takes new user data and adds it to the page.
    // This method should be used after successful submission of the profile form.
    this._name.textContent = name;
    this._job.textContent = job;
  }
}
