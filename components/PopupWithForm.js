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
    this._form = this._popupSelector.querySelector('.popup__form');

    super.setEventListeners();
    //Ресет формы при закрытии.
    this._closeIcon.addEventListener('click', () => {
      this.close();
      this._form.reset();
    });
    //Слушатель закрытия popup по оверлей.
    document.addEventListener('click', (evt) => {
      if (evt.target === this._popupSelector) {
        this.close();
        this._form.reset();
      };
    });
    //Сабмит формы.
    this._form.addEventListener('submit', () => {
      this._submitHandler(this._getInputValues());
      this._form.reset();
    });
    this._form.removeEventListener('submit', this._submitHandler);
  }
}
