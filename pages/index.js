import Card from '../components/Card.js';
import { FormValidator, formAdd, formEdit } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { object, initialCards } from '../utils/utils.js';

//Иконки и кнопки.
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
//Поля ввода.
const nameInput = document.querySelector('.popup__input_element_name');
const jobInput = document.querySelector('.popup__input_element_job');
const placeInput = document.querySelector('.popup__input__element_place');
const linkInput = document.querySelector('.popup__input_element_link');
//Элементы профиля, куда должны быть вставлены значения value полей.
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
//Элементы попапа с картинкой.
const popupElementImage = document.querySelector('.popup__image');
const popupElementText = document.querySelector('.popup__text');
// Валидация полей формы.
const validatedFormEdit = new FormValidator(object, formEdit);
validatedFormEdit.enableValidation();
const validatedFormAdd = new FormValidator(object, formAdd);
validatedFormAdd.enableValidation();
//Попапы
const popupAdd = new Popup('.popup_type_add-form');
popupAdd.setEventListeners();
const popupEdit = new Popup('.popup_type_edit-profile');
popupEdit.setEventListeners();
const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();
//Создать и наполнить новую карточку, вставить в общий список.
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    //1 создать экземпляр карточки.
    const newCard = new Card(item.name, item.link, '.card__template');
    //2 создать и наполнить карточку.
    const cardElement = newCard.generateCard();
    //3 вернуть карточку.
    cardsList.addItem(cardElement);
  }
}, '.cards__list');

cardsList.renderElements();


//ФУНКЦИЯ ДОБАВЛЕНИЯ НОВЫХ КАРТОЧЕК ПОЛЬЗОВАТЕЛЕМ
// Обработчик «отправки» формы.
function formAddSubmitHandler() {
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
  popupAdd.close();
  //6 обнулить форму.
  formAdd.reset();
  validatedFormAdd.clearForm();
};
// Прикрепить обработчик к форме:
formAdd.addEventListener('submit', formAddSubmitHandler);

//ФУНКЦИЯ СОХРАНЕНИЯ ФОРМЫ РЕДАКТИРОВАНИЯ
  // Обработчик «отправки» формы.
function formEditSubmitHandler() {
  // Получить значение полей из свойства value.
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  // Вставить новые значения с помощью textContent.
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  //Автоматически закрыть попап.
  popupEdit.close();
}
// Прикрепить обработчик к форме:
formEdit.addEventListener('submit', formEditSubmitHandler);


// СЛУШАТЕЛИ
  // Cлушатель на кнопку редактирования.
editButton.addEventListener('click', () => {
  validatedFormEdit.clearForm();
  //Подтянуть из profileName и profileJob пользователя данные поля формы
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupEdit.open();
});

  //Cлушатель на кнопку добавления новой карточки.
addButton.addEventListener('click', () => {
  popupAdd.open();
});
