export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._nameContent = document.querySelector(nameSelector);
    this._aboutContent = document.querySelector(aboutSelector);
  }

  getUserInfo() {
  const profileData = {
    name: this._nameContent.textContent,
    about: this._aboutContent.textContent
  };
  return profileData;
  }

  setUserInfo(newData) {
    //принимает новые данные пользователя и добавляет их на страницу.
    this._nameContent.textContent = newData.name;
    this._aboutContent.textContent = newData.about;
  }

}
