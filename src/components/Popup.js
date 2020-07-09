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
    window.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
  }
  //Метод закрытия Popup клавишей esc.
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  //Метод добавления слушателей.
  setEventListeners() {
    //Слушателя закрытия popup по оверлей.
    document.addEventListener('click', (evt) => {
      if (evt.target === this._popupSelector) {
        this.close()
      };
    });
    //Закрытие popup по нажатию на крестик.
    this._closeIcon = this._popupSelector.querySelector('.popup__close-icon');
    this._closeIcon.addEventListener('click', () => this.close());
    //Закрытие popup на Esc.
    window.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }
}
