export default class Card {
  constructor(data, cardSelector, isLiked,
    { handleCardClick }, { handleBinClick }, { handleLikeClick }) {
    this._title = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this._cardSelector = cardSelector;
    this._isLiked = isLiked;
    this._handleCardClick = handleCardClick;
    this._handleBinClick = handleBinClick;
    this._handleLikeClick = handleLikeClick
  }

  //Получить шаблон.
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  //Наполнить карточку.
  generateCard(isIdEqual) {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.card__photo');
    this._counter = this._element.querySelector('.card__counter');
    // Проверка наличия лайка для его окраски.
    if (this._isLiked) {
      this._like = this._element.querySelector('.card__like');
      this._like.classList.add('card__like_active');
    } else {
      this._like = this._element.querySelector('.card__like');
    }
    // Проверка id владельца для добавления иконки корзины.
    if (!isIdEqual) {
      this._bin = this._element.querySelector('.card__bin');
      this._bin.classList.add('card__bin_hidden');
    } else {
      this._bin = this._element.querySelector('.card__bin');
    }

    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._title;
    this._image.alt = this._title;
    this._image.src = this._link;
    this._counter.textContent = this._likes;

    return this._element;
  }

  toggleLike(likes) {
    this._counter.textContent = likes.length;
    this._isLiked = !this._isLiked;
    this._like.classList.toggle('card__like_active');
  }

  //Удалить карточку.
  deleteCard() {
    this._element.remove();
    this._element = null;
    this._bin.removeEventListener('click', () => this._handleBinClick());
  }

  //МЕТОД ДОБАВЛЕНИЯ СЛУШАТЕЛЕЙ НА ЭЛЕМЕНТЫ КАРТОЧКИ
  _setEventListeners() {
    //1 добавить слушателя на корзину.
    this._bin.addEventListener('click', () => this._handleBinClick());
    //2 добавить слушателя на сердечко.
    this._like.addEventListener('click', () => this._handleLikeClick(this._isLiked));
    //3 добавить слушателя на картинку с вызовом функции.
    this._image.addEventListener('click', () => this._handleCardClick());
  }
}
