import { popupImage, popupElementImage, popupElementText, togglePopup } from './index.js';

export default class Card {
  constructor(name, link, cardSelector) {
    this._title = name;
    this._link = link;
    this._cardSelector = cardSelector
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
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__photo').alt = this._title;
    this._element.querySelector('.card__photo').src = this._link;

    return this._element;
  }

  _likeCard() {
    like.classList.toggle('card__like_active');
  };

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleCardPhoto() {
    //1 подтянуть изображение из карточки в попап.
    popupElementImage.src = evt.target.src;
    //2 подтянуть заголовок карточки в попап.
    popupElementText.textContent = evt.target.alt;
    //3 открыть попап.
    togglePopup(popupImage);
  }

  //МЕТОД ДОБАВЛЕНИЯ СЛУШАТЕЛЕЙ НА ЭЛЕМЕНТЫ КАРТОЧКИ
  _setEventListeners() {
    //1 добавить слушателя на сердечко.
    const like = this._element.querySelector('.card__like');
    like.addEventListener('click', this._likeCard);
    //2 добавить слушателя на корзину.
    const bin = this._element.querySelector('.card__bin');
    bin.addEventListener('click', this._deleteCard);
    //3 добавить слушателя на картинку с вызовом функции.
    const image = this._element.querySelector('.card__photo');
    image.addEventListener('click', this._handleCardPhoto);
  }
}
