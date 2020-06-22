// export const forms = document.querySelectorAll('.popup__form');
export const formEdit = document.querySelector('.popup__container_type_edit-profile');
export const formAdd = document.querySelector('.popup__container_type_add-form');

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

  //ДОБАВЛЕНИЕ КЛАССА С ОШИБКОЙ
  _showInputError(form, input, errorMessage) {
    const error = form.querySelector(`#${input.id}-error`);
    input.classList.add(this._object.inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(this._object.errorClass);
  }

  //УДАЛЕНИЕ КЛАССА С ОШИБКОЙ
  _delInputError(form, input) {
    const error = form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._object.inputErrorClass);
    error.classList.remove(this._object.errorClass);
    error.textContent = '';
  }

  //ПРОВЕРКА ВАЛИДНОСТИ ПОЛЯ
  _ValidityState(form, input) {
    if (input.validity.valid) {
      this._delInputError(form, input);
    } else {
      this._showInputError(form, input, input.validationMessage);
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

  //ОЧИСТКА ВАЛИДАЦИИ
  clearForm() {
    this._form.reset();
    this._form.enableValidation();
  }

  //ВАЛИДАЦИЯ ФОРМЫ
  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners(this._form);
    };
}

export const validatedFormEdit = new FormValidator(object, formEdit);
validatedFormEdit.enableValidation();
export const validatedFormAdd = new FormValidator(object, formAdd);
validatedFormAdd.enableValidation();

// forms.forEach((form) => {
//   const validatedForm = new FormValidator(object, form);
//   validatedForm.enableValidation();
// })
