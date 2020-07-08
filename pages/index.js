import Card from '../components/Card.js';
import { FormValidator, formAdd, formEdit } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { object, initialCards } from '../utils/utils.js';
import UserInfo from '../components/UserInfo.js';

//Иконки и кнопки.
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
//Поля ввода.
const nameInput = document.querySelector('.popup__input_element_name');
const jobInput = document.querySelector('.popup__input_element_job');
const placeInput = document.querySelector('.popup__input__element_place');
const linkInput = document.querySelector('.popup__input_element_link');
//Элементы popup с картинкой.
const popupElementImage = document.querySelector('.popup__image');
const popupElementText = document.querySelector('.popup__text');

// Валидация полей формы.
const validatedFormEdit = new FormValidator(object, formEdit);
validatedFormEdit.enableValidation();
const validatedFormAdd = new FormValidator(object, formAdd);
validatedFormAdd.enableValidation();

//Popup с всплывающим изображением.
const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

// PopUp с формой добавления новой карточки.
const popupAdd = new PopupWithForm('.popup_type_add-form',
  {
    submitHandler: (values) => {
      //1 создать экземпляр карточки.
      const newCard = new Card(values, '.card__template');
      //2 наполнить карточку.
      const cardElement = newCard.generateCard();
      //3 вставить карточку в начало списка.
      cardsList.addItem(cardElement);
      //4 автоматически закрыть popup.
      popupAdd.close();
      //6 обнулить форму.
      validatedFormAdd.clearForm();
    }
  }
);
popupAdd.setEventListeners();

//Popup с формой редактирования профиля.
const popupEdit = new PopupWithForm('.popup_type_edit-profile',
  {
    submitHandler: (values) => {
      //1 подставить новые значения полей в профиль пользователя.
      userInfo.setUserInfo(values);
      //2 автоматически закрыть попап.
      popupEdit.close();
    }
  });

popupEdit.setEventListeners();

//Профиль пользователя.
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'
});

//Создать и наполнить новую карточку, вставить в общий список.
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    //1 создать экземпляр карточки.
    const newCard = new Card(item, '.card__template');
    //2 создать и наполнить карточку.
    const cardElement = newCard.generateCard();
    //3 вернуть карточку.
    cardsList.addItem(cardElement);
  }
}, '.cards__list');

cardsList.renderElements();


// СЛУШАТЕЛИ
// Cлушатель на кнопку редактирования.
editButton.addEventListener('click', () => {
  validatedFormEdit.clearForm();
  //Подтянуть данные пользователя в popup.
  userInfo.getUserInfo();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  popupEdit.open();
});

//Cлушатель на кнопку добавления новой карточки.
addButton.addEventListener('click', () => {
  popupAdd.open();
});
