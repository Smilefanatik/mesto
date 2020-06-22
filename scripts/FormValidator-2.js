// import { object } from './validation.js';

// class FormValidator {
//   constructor(object, form) {
//   }

//   //ФУНКЦИЯ ДОБАВЛЕНИЯ КЛАССА С ОШИБКОЙ
//   _showInputError(form, input, errorMessage) {
//     const error = form.querySelector(`#${input.id}-error`);
//     input.classList.add(object.inputErrorClass);
//     error.textContent = errorMessage;
//     error.classList.add(object.errorClass);
//   }

//   //ФУНКЦИЯ УДАЛЕНИЯ КЛАССА С ОШИБКОЙ
//   _delInputError(form, input) {
//     const error = form.querySelector(`#${input.id}-error`);
//     input.classList.remove(object.inputErrorClass);
//     error.classList.remove(object.errorClass);
//     error.textContent = '';
//   }

//   //ФУНКЦИЯ ПРОВЕРКИ ВАЛИДНОСТИ ПОЛЯ
//   _ValidityState(form, input) {
//     if (input.validity.valid) {
//       _delInputError(form, input);
//     } else {
//       _showInputError(form, input, input.validationMessage);
//     }
//   }

//   //ФУНКЦИЯ ПРОВЕРКИ ПОЛЕЙ ФОРМЫ НА ВАЛИДНОСТЬ
//   _hasInvalidInput(inputList) {
//     return inputList.some((input) => {
//       return !input.validity.valid;
//     });
//   }

//   //ФУНКЦИЯ ИЗМЕНЕНИЯ СОСТОЯНИЯ КНОПКИ
//   _toggleButtonState(inputList, button) {
//     if (_hasInvalidInput(inputList)) {
//       button.classList.add(object.inactiveButtonClass);
//       button.setAttribute('disabled', true);
//     } else {
//       button.classList.remove(object.inactiveButtonClass);
//       button.removeAttribute('disabled');
//     }
//   }

//   //ФУНКЦИЯ ДОБАВЛЕНИЯ ОБРАБОТЧИКА ПОЛЯМ ВВОДА
//   _setEventListeners(form) {
//     const inputList = Array.from(form.querySelectorAll(object.inputSelector));
//     const button = form.querySelector(object.submitButtonSelector);

//     _toggleButtonState(inputList, button);

//     inputList.forEach((input) => {
//       input.addEventListener('input', () => {
//         _ValidityState(form, input);
//         _toggleButtonState(inputList, button);
//       });
//     });
//   }

//   //ФУНКЦИЯ ДОБАВЛЕНИЯ ОБРАБОТЧИКОВ ВСЕМ ФОРМАМ
//   enableValidation(object) {
//     const formList = Array.from(document.querySelectorAll(object.formSelector));
//     formList.forEach((form) => {
//       form.addEventListener('submit', (evt) => {
//         evt.preventDefault();
//       });
//       setEventListeners(form);
//     });
//   }
// }

// enableValidation(object);
