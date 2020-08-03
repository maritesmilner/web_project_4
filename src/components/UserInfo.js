export default class UserInfo {
  constructor(nameSelector, titleSelector , avatarSelector) {
    this._nameELement = document.querySelector(nameSelector);
    this._titleElement = document.querySelector(titleSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._name = this._nameELement.textContent;
    this._title = this._titleElement.textContent;
    this._avatar = this._avatarElement.src;
  }
  getUserInfo() {
    return {
      name: this._name,
      about: this._title
    }
  }
  setUserInfo({name, about, avatar, _id}) {
    this._name = name;
    this._title = about;
    this._avatar = avatar;
    this._nameELement.textContent = name;
    this._titleElement.textContent = about;
    this._avatarElement.src = avatar;
    // this._avatarElement.style.backgroundImage = `url(${avatar})`;
    this._id = _id;
  }
  getUserId() {
    return this._id;
  }
  getAvatar() {
    return this._avatar;
  }
  setAvatarElement(avatarUrl) {
    this._avatarElement.style.backgroundImage = `url(${avatarUrl})`;
  }
}
