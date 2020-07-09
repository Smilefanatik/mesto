export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameContent = document.querySelector(nameSelector);
    this._jobContent = document.querySelector(jobSelector);
  }

  getUserInfo() {
  const profileData = {
    name: this._nameContent.textContent,
    job: this._jobContent.textContent
  };
  return profileData;
  }

  setUserInfo(newData) {
    //принимает новые данные пользователя и добавляет их на страницу.
    this._nameContent.textContent = newData.name;
    this._jobContent.textContent = newData.job;
  }

}
