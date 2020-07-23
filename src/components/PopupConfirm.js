import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._button = this._popup.querySelector('.popup__save-button');
  }

  setSubmitHandler(handler) {
    this._submitHandler = handler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', () => {
      this._submitHandler();
      this.close();
    });
  }
}
