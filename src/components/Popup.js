export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    //Функция закрытия Popup клавишей esc.
    this._handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      };
    }
    //Функция закрытия Popup по оверлей.
    this._handleOverlayClose = (evt) => {
      if (evt.target === this._popup) {
        this.close();
      };
    }
  }
  //Метод открытия Popup
  open() {
    //Слушатель закрытия popup на Esc.
    document.addEventListener('keydown', this._handleEscClose);
    //Слушатель закрытия popup по оверлей.
    document.addEventListener('click', this._handleOverlayClose);
    this._popup.classList.add('popup_opened');
  }

  //Метод закрытия Popup
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._handleOverlayClose);
  }


  //Метод добавления слушателей.
  setEventListeners() {
    //Закрытие popup по нажатию на крестик.
    this._closeIcon = this._popup.querySelector('.popup__close-icon');
    this._closeIcon.addEventListener('click', () => this.close());
  }
}
