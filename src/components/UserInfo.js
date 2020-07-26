export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameContent = document.querySelector(nameSelector);
    this._aboutContent = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const profileData = {
      name: this._nameContent.textContent,
      about: this._aboutContent.textContent
    };
    return profileData;
  }

  setAvatar(newData) {
    this._avatar.src = newData.avatar;
  }

  setUserInfo(newData) {
    //принимает новые данные пользователя и добавляет их на страницу.
    this._nameContent.textContent = newData.name;
    this._aboutContent.textContent = newData.about;
  }
}
