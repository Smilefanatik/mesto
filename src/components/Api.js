export default class Api {
  constructor({ baseUrl, headers = {} }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getCardsInfo() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }

  changeProfileData(values) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: values.name,
        about: values.about
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }

  addNewCard(values) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: values.name,
        link: values.link
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }

  deleteCard(cardId) {
    fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((response) => {
        if (response.ok) {
          console.log(response.json());
        }
        return Promise.reject(`Ошибка: ${response.status}`);
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }
}
