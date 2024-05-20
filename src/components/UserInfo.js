export default class UserInfo {
  constructor(profileEditForm, { name, job }) {
    this._name = name;
    this._job = job;
    this._profileEditForm = profileEditForm;
  }

  getUserInfo() {
    this._name.textContent = profileTitleInput.value;
    this._job.textContent = profileDescriptionInput.value;
  }

  setUserInfo(evt) {
    // takes new user data and adds it to the page.
    // This method should be used after successful submission of the profile form.
    if (evt === "submit") {
      this._profileTitleInput.value = this._name;
      this._profileDescriptionInput.value = this._job;
    }
    this._profileEditForm.setUserInfo();
  }
}
