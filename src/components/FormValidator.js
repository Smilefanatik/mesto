

export class FormValidator {
  constructor(object, form) {
    this._object = object;
    this._form = form;
  }

  //ДОБАВЛЕНИЕ КЛАССА С ОШИБКОЙ
  _showInputError(inputElement, errorMessage) {
    const error = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._object.inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(this._object.errorClass);
  }

  //УДАЛЕНИЕ КЛАССА С ОШИБКОЙ
  _delInputError(inputElement) {
    const error = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._object.inputErrorClass);
    error.classList.remove(this._object.errorClass);
    error.textContent = '';
  }

  //ПРОВЕРКА ВАЛИДНОСТИ ПОЛЯ
  _ValidityState(inputElement) {
    if (inputElement.validity.valid) {
      this._delInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  //ПРОВЕРКА ПОЛЕЙ ФОРМЫ НА ВАЛИДНОСТЬ
  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  //ИЗМЕНЕНИЕ СОСТОЯНИЯ КНОПКИ
  _toggleButtonState(inputList, button) {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add(this._object.inactiveButtonClass);
      button.setAttribute('disabled', true);
    } else {
      button.classList.remove(this._object.inactiveButtonClass);
      button.removeAttribute('disabled');
    }
  }

  //ДОБАВЛЕНИЕ ОБРАБОТЧИКОВ ПОЛЯМ ВВОДА
  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._object.inputSelector));
    const button = this._form.querySelector(this._object.submitButtonSelector);

    this._toggleButtonState(inputList, button);

    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._ValidityState(input);
        this._toggleButtonState(inputList, button);
      });
    });
  }

  //ОЧИСТКА ВАЛИДАЦИИ
  clearForm() {
    const inputList = Array.from(this._form.querySelectorAll(this._object.inputSelector));
    inputList.forEach((input) => {
      this._delInputError(input);
      });
    const button = this._form.querySelector(this._object.submitButtonSelector);
    this._toggleButtonState(inputList, button);
  }

  //ВАЛИДАЦИЯ ФОРМЫ
  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
    };
}
