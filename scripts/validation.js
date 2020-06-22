export const forms = document.querySelectorAll('.popup__form');

const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_element_error',
  errorClass: 'popup__input-error_active'
};

export class FormValidator {
  constructor(object, form) {
    this._object = object;
    this._form = form;
  }

  //ФУНКЦИЯ ДОБАВЛЕНИЯ КЛАССА С ОШИБКОЙ
  _showInputError(form, input, errorMessage) {
    const error = form.querySelector(`#${input.id}-error`);
    input.classList.add(this._object.inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(this._object.errorClass);
  }

  //ФУНКЦИЯ УДАЛЕНИЯ КЛАССА С ОШИБКОЙ
  _delInputError(form, input) {
    const error = form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._object.inputErrorClass);
    error.classList.remove(this._object.errorClass);
    error.textContent = '';
  }

  //ФУНКЦИЯ ПРОВЕРКИ ВАЛИДНОСТИ ПОЛЯ
  _ValidityState(form, input) {
    if (input.validity.valid) {
      this._delInputError(form, input);
    } else {
      this._showInputError(form, input, input.validationMessage);
    }
  }

  //ФУНКЦИЯ ПРОВЕРКИ ПОЛЕЙ ФОРМЫ НА ВАЛИДНОСТЬ
  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  //ФУНКЦИЯ ИЗМЕНЕНИЯ СОСТОЯНИЯ КНОПКИ
  _toggleButtonState(inputList, button) {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add(this._object.inactiveButtonClass);
      button.setAttribute('disabled', true);
    } else {
      button.classList.remove(this._object.inactiveButtonClass);
      button.removeAttribute('disabled');
    }
  }

  //ФУНКЦИЯ ДОБАВЛЕНИЯ ОБРАБОТЧИКА ПОЛЯМ ВВОДА
  _setEventListeners(form) {
    const inputList = Array.from(form.querySelectorAll(this._object.inputSelector));
    const button = form.querySelector(this._object.submitButtonSelector);

    this._toggleButtonState(inputList, button);

    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._ValidityState(form, input);
        this._toggleButtonState(inputList, button);
      });
    });
  }

  //ФУНКЦИЯ ДОБАВЛЕНИЯ ОБРАБОТЧИКОВ ВСЕМ ФОРМАМ
  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners(this._form);
    };
}


forms.forEach((form) => {
  const validatedForm = new FormValidator(object, form);
  validatedForm.enableValidation();
})
