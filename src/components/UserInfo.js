import {
  profileName,
  profileTitle,
  profileNameField,
  profileTitleField,
} from "../utils/constants.js";

export default class UserInfo {
  constructor(name, job) {
    this._name = name;
    this._job = job;
  }
  getUserInfo() {
    return {
      name: this_name,
      job: this_job
    }

  }
  setUserInfo() {
    profileName.textContent = profileNameField.value;
    profileTitle.textContent = profileTitleField.value;
  }
}
