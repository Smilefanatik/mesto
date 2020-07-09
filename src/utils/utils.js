//Объект настроек для валидации формы. Импортируется в index.js.
export const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_element_error',
  errorClass: 'popup__input-error_active'
};

//НАПОЛНЕНИЕ CARDS 6 КАРТОЧКАМИ
//При загрузке на странице должно быть 6 карточек, которые добавит JavaScript на основе готового массива.
export const initialCards = [
  {
    name: 'Лес',
    link: './images/photo_sequoia.jpg'
  },
  {
    name: 'Герой асфальта',
    link: './images/photo_road.jpg'
  },
  {
    name: 'Крапива',
    link: './images/photo4.jpg'
  },
  {
    name: 'Фантазия',
    link: './images/photo_carpet.jpg'
  },
  {
    name: 'Пати бас',
    link: './images/photo5.jpg'
  },
  {
    name: 'Полянка',
    link: './images/photo_meadow.jpg'
  }
];
