import Card from './Card.js';
import { FormValidator, formAdd, formEdit } from './FormValidator.js';
import { object, initialCards } from './utils.js';

//Иконки и кнопки.
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
//Попапы и формы.
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit-profile');
const popupAdd = document.querySelector('.popup_type_add-form');
//Поля ввода.
const nameInput = document.querySelector('.popup__input_element_name');
const jobInput = document.querySelector('.popup__input_element_job');
const placeInput = document.querySelector('.popup__input__element_place');
const linkInput = document.querySelector('.popup__input_element_link');
//Список элементов для вывода первых 6 карточек мест.
const cardsList = document.querySelector('.cards__list');
// Элементы профиля, куда должны быть вставлены значения value полей.
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
//Page для делегирования.
const page = document.querySelector('.page');
//Элементы попапа с картинкой.
export const popupImage = document.querySelector('.popup_type_image');
export const popupElementImage = document.querySelector('.popup__image');
export const popupElementText = document.querySelector('.popup__text');
// Валидация полей формы.
const validatedFormEdit = new FormValidator(object, formEdit);
validatedFormEdit.enableValidation();
const validatedFormAdd = new FormValidator(object, formAdd);
validatedFormAdd.enableValidation();



//ФУНКЦИЯ ОТКРЫТИЯ И ЗАКРЫТИЯ ПОПАПА
//Функция, которая открывает или закрывает Popup.
export function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

//ФУНКЦИЯ ДОБАВЛЕНИЯ НОВЫХ КАРТОЧЕК ПОЛЬЗОВАТЕЛЕМ
// Обработчик «отправки» формы.
function formAddSubmitHandler () {
  //1 взять из формы название места и ссылку на картинку.
  const placeValue = placeInput.value;
  const linkValue = linkInput.value;
  //2 создать экземпляр карточки.
  const newCard = new Card(placeValue, linkValue, '.card__template');
  //3 наполнить карточку.
  const cardElement = newCard.generateCard();
  //4 вставить карточку в начало списка.
  cardsList.prepend(cardElement);
  //5 автоматически закрыть попап.
  togglePopup(popupAdd);
  //6 обнулить форму.
  formAdd.reset();
  validatedFormAdd.clearForm();
};
// Прикрепить обработчик к форме:
formAdd.addEventListener('submit', formAddSubmitHandler);

//ФУНКЦИЯ СОХРАНЕНИЯ ФОРМЫ РЕДАКТИРОВАНИЯ
// Обработчик «отправки» формы.
function formEditSubmitHandler () {
  // Получить значение полей из свойства value.
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  // Вставить новые значения с помощью textContent.
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;

  //Автоматически закрыть попап.
  togglePopup(popupEdit);
}
// Прикрепить обработчик к форме:
formEdit.addEventListener('submit', formEditSubmitHandler);

//___________________________________________________________________________

//СЛУШАТЕЛИ
//Cлушатель на кнопку редактирования.
editButton.addEventListener('click', () => {
  validatedFormEdit.clearForm();
  //Подтянуть из profileName и profileJob пользователя данные поля формы
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  togglePopup(popupEdit);
});

//Cлушатель на кнопку добавления новой карточки.
addButton.addEventListener('click', () => {
  togglePopup(popupAdd);
});

//Cлушатель на крестик и оверлэй.
page.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__close-icon')) {
    const whichPopup = evt.target.closest('.popup');
    togglePopup(whichPopup);
  }
  if (evt.target.classList.contains('popup')) {
    togglePopup(evt.target);
  }
});

//Закрытие попапа по нажатию Esc.
  window.addEventListener('keydown', (evt) => {
    const popupsList = Array.from(popups);
    popupsList.forEach((popup) => {
      if (evt.key === 'Escape') {
        popup.classList.remove('popup_opened');
       };
    });
    })

//___________________________________________________________________________
//ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧЕК ИЗ МАССИВА
function addArrayItems(item) {
  //1 создать экземпляр карточки.
  const newCard = new Card(item.name, item.link, '.card__template');
  //2 создать и наполнить карточку.
  const cardElement = newCard.generateCard();
  //3 добавить новую карточку в список элементов.
  cardsList.append(cardElement);
}

//Наполнить element содержимым: методом forEach добавить заголовок и изображение в карточку.
initialCards.forEach(addArrayItems);
