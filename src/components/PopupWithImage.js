import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    //Поиск элементов.
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupText = this._popup.querySelector('.popup__text');
  }

  //Метод открытия Popup
  open(item) {
    //Заполнить popup содержимым карточки.
    this._popupImage.src = item.link;
    this._popupImage.alt = item.name;
    this._popupText.textContent = item.name;
    super.open();
  }
}
