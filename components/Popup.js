export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }
    //Метод открытия Popup
  open() {
    this._popupSelector.classList.add('popup_opened');
  }
    //Метод закрытия Popup
  close() {
    this._popupSelector.classList.remove('popup_opened');
  }
  //Метод закрытия Popup клавишей esc.
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }
  //Метод добавления слушателей.
  setEventListeners() {
    //Добавление слушателя всему элементу popup по оверлей.
    this._popupSelector.addEventListener('click', () => this.close());
    //Закрытие popup по нажатию на крестик.
    this._closeIcon = this._popupSelector.querySelector('.popup__close-icon');
    this._closeIcon.addEventListener('click', () => this.close());
    window.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

}
