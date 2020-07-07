import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  //Метод открытия Popup
  open(link, title) {
    //Поиск элементов.
    this._popupImage = this._popupSelector.querySelector('.popup__image');
    this._popupText = this._popupSelector.querySelector('.popup__text');
    //Заполнить popup содержимым карточки.
    this._popupImage.src = link;
    this._popupImage.alt = title;
    this._popupText.textContent = title;

    this._popupSelector.classList.add('popup_opened');
  }
}
