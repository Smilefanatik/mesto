import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitHandler }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }

  close() {
    super.close();
    this._form.reset();
  }

  //Метод сбора данных полей.
  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    //Создать пустой объект.
    this._formValues = {};
    //Добавить в объект значения всех полей.
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    //Вернуть заполненный объект.
    return this._formValues;
  }

  //Метод отображения лоадера.
  renderLoading(isLoading, buttonWord) {
    this._submitButton = this._popup.querySelector('.popup__save-button');
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = buttonWord;
    }
  }

  //Метод назначения сабмита.
  setSubmitHandler(handler) {
    this._submitHandler = handler;
  }

  setEventListeners() {
    this._form = this._popup.querySelector('.popup__form');

    super.setEventListeners();

    //Сабмит формы.
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    })
  }
}
