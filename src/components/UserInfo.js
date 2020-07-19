export default class UserInfo {
  constructor(nameSelector, titleSelector) {
    this._nameELement = document.querySelector(nameSelector);
    this._titleElement = document.querySelector(titleSelector);
    this._name = this._nameELement.textContent;
    this._title = this._titleElement.textContent;
  }
  getUserInfo() {
    return {
      name: this._name,
      title: this._title
    }
  }
  setUserInfo(name, title) {
    this._name = name;
    this._title = title;
    this._nameELement.textContent = name;
    this._titleElement.textContent = title;
  }
}
