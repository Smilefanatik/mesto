import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitHandler }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }
  //Метод сбора данных полей.
  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
  //Создать пустой объект.
    this._formValues = {};
  //Добавить в объект значения всех полей.
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
  //Вернуть заполненный объект.
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form = this._popupSelector.querySelector('.popup__form');
    this._form.addEventListener('submit', () => {
      this._submitHandler(this._getInputValues());
      this._form.reset();
    });
  }
}
