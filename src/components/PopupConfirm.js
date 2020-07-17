import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, { submitHandler }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._button = document.querySelector('.popup__save-button');
    this._button.addEventListener('submit', () => {
      this._submitHandler();
    })
  }
}
