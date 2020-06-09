const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_element_error',
  errorClass: 'popup__input-error_active'
}

//ФУНКЦИЯ ДОБАВЛЕНИЯ КЛАССА С ОШИБКОЙ
const showInputError = (form, input, errorMessage) => {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.add(object.inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(object.errorClass);
}

//ФУНКЦИЯ УДАЛЕНИЯ КЛАССА С ОШИБКОЙ
const delInputError = (form, input) => {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.remove(object.inputErrorClass);
  error.classList.remove(object.errorClass);
  error.textContent = '';
}

//ФУНКЦИЯ ПРОВЕРКИ ВАЛИДНОСТИ ПОЛЯ
const isValid = (form, input) => {
  if (input.validity.valid) {
    delInputError(form, input);
  } else {
    showInputError(form, input, input.validationMessage);
  }
}

//ФУНКЦИЯ ПРОВЕРКИ ПОЛЕЙ ФОРМЫ НА ВАЛИДНОСТЬ
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

//ФУНКЦИЯ ИЗМЕНЕНИЯ СОСТОЯНИЯ КНОПКИ
const toggleButtonState = (inputList, button) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(object.inactiveButtonClass);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(object.inactiveButtonClass);
    button.removeAttribute('disabled');
  }
}

//ФУНКЦИЯ ДОБАВЛЕНИЯ ОБРАБОТЧИКА ПОЛЯМ ВВОДА
const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(object.inputSelector));
  const button = form.querySelector(object.submitButtonSelector);

  toggleButtonState(inputList, button);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input);
      toggleButtonState(inputList, button);
    });
  });
}

//ФУНКЦИЯ ДОБАВЛЕНИЯ ОБРАБОТЧИКОВ ВСЕМ ФОРМАМ
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form);
  });
}

enableValidation(object);
