import { popupConfirm } from '../pages/index.js';

export default class Card {
  constructor(data, cardSelector, { handleCardClick }) {
    this._title = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.card__photo');
    this._like = this._element.querySelector('.card__like');
    this._bin = this._element.querySelector('.card__bin');
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__photo').alt = this._title;
    this._element.querySelector('.card__photo').src = this._link;

    return this._element;
  }

  _likeCard() {
    return this._like.classList.toggle('card__like_active');
  };

  // _deleteCard() {
  //   this._element.remove();
  //   this._element = null;
  // }

  //МЕТОД ДОБАВЛЕНИЯ СЛУШАТЕЛЕЙ НА ЭЛЕМЕНТЫ КАРТОЧКИ
  _setEventListeners() {
    //1 добавить слушателя на сердечко.
    this._like.addEventListener('click', () => this._likeCard());
    //2 добавить слушателя на корзину.
    this._bin.addEventListener('click', () => popupConfirm.open());
    //3 добавить слушателя на картинку с вызовом функции.
    this._image.addEventListener('click', () => this._handleCardClick());
  }
}
