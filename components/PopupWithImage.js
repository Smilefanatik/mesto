import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  //Метод открытия Popup
  open(item) {
    //Поиск элементов.
    this._popupImage = this._popupSelector.querySelector('.popup__image');
    this._popupText = this._popupSelector.querySelector('.popup__text');
    //Заполнить popup содержимым карточки.
    this._popupImage.src = item.link;
    this._popupImage.alt = item.name;
    this._popupText.textContent = item.name;

    this._popupSelector.classList.add('popup_opened');
  }
}
