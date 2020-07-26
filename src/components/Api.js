export default class Api {
  constructor({ baseUrl, headers = {} }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  //Получить начальную информацию о пользователе.
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        };
        return Promise.reject(`Ошибка: ${response.status}`);
      })
  }

  //Получить начальный массив с карточками.
  getCardsInfo() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        };
        return Promise.reject(`Ошибка: ${response.status}`);
      })
  }

  //Изменить информацию о пользователе.
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
        };
        return Promise.reject(`Ошибка: ${response.status}`);
      })
  }

  //Добавить новую карточку.
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
        };
        return Promise.reject(`Ошибка: ${response.status}`);
      })
  }

  //Удалить карточку.
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        };
      })
  }

  //Поставить лайк.
  addLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        };
        return Promise.reject(`Ошибка: ${response.status}`);
      })
  }

  //Удалить лайк.
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        };
        return Promise.reject(`Ошибка: ${response.status}`);
      })
  }

  changeAvatar(values) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(values)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        };
        return Promise.reject(`Ошибка: ${response.status}`);
      })
  }
}


