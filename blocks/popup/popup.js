const editButton = document.querySelector('.profile__edit-button');
const closeIcon = document.querySelector('.popup__close-icon');
const popup = document.querySelector('.popup');

//Добавить слушателя на кнопку редактирования.
editButton.addEventListener('click', open);

//Функция, которая открывает Popup.
function open() {
    //Добавить модификатор.
  popup.classList.add('popup_opened');
}

//Добавить слушателя на кнопку закрытия popup.
closeIcon.addEventListener('click', close);

//Функция, которая закрывает Popup.
function close() {
  //Удалить модификатор.
  popup.classList.remove('popup_opened');
}

