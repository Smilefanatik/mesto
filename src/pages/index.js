import './index.css';

import Card from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { object, initialCards } from '../utils/utils.js';

// this._avatarContent = document.querySelector(avatarSelector);
const overlay = document.querySelector('.profile__overlay');
const avatar = document.querySelector('.profile__avatar');
//Иконки и кнопки.
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//Поля ввода.
const nameInput = document.querySelector('.popup__input_element_name');
const aboutInput = document.querySelector('.popup__input_element_about');

// Валидация полей формы.
const formEdit = document.querySelector('.popup__container_type_edit-profile');
const formAdd = document.querySelector('.popup__container_type_add-form');
const formAvatar = document.querySelector('.popup__container_type_edit-avatar');
const validatedFormEdit = new FormValidator(object, formEdit);
validatedFormEdit.enableValidation();
const validatedFormAdd = new FormValidator(object, formAdd);
validatedFormAdd.enableValidation();
const validatedFormAvatar = new FormValidator(object, formAvatar);
validatedFormAvatar.enableValidation();

//Профиль пользователя.
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about'
});

//Popup с всплывающим изображением.
const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

// PopUp с формой добавления новой карточки.
const popupAdd = new PopupWithForm('.popup_type_add-form',
  {
    submitHandler: (values) => {
      //Отправить данные новой карточки на сервер.
      api.addNewCard(values).then((data) => {
        //1 создать экземпляр карточки.
        const newCard = new Card(data, '.card__template',
          {
            handleCardClick: () => {
              popupImage.open(data)
            }
          });
        //2 наполнить карточку.
        const cardElement = newCard.generateCard();
        //3 вставить карточку в начало списка.
        cardsList.addItem(cardElement);
      })
      //4 автоматически закрыть popup.
      popupAdd.close();
      //5 обнулить форму.
      validatedFormAdd.clearForm();
    }
  }
);
popupAdd.setEventListeners();

//Popup с формой редактирования профиля.
const popupEdit = new PopupWithForm('.popup_type_edit-profile',
  {
    submitHandler: (values) => {
      //1 Отправить на сервер новые данные.
      api.changeProfileData(values).then((data) => {
        //2 подставить новые значения полей в профиль пользователя.
        userInfo.setUserInfo(data);
      })
      //3 автоматически закрыть popup.
      popupEdit.close();
    }
  });

popupEdit.setEventListeners();

const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', {
  submitHandler: (e) => {
    console.log(e);
  }
});
popupEditAvatar.setEventListeners();


//Popup удаления карточки.
export const popupConfirm = new PopupConfirm('.popup_type_confirm',
  {
    submitHandler: () => {
    }
  });

popupConfirm.setEventListeners();

//Создать экземпляр класса Api для связи с сервером.
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: '8a32d376-0349-4b99-b4c1-e80b592cabc8',
    'Content-Type': 'application/json'
  }
});

// Получить начальные данные пользователя.
api.getUserInfo().then((userData) => {
  userInfo.setUserInfo(userData);
  avatar.src = userData.avatar;
});

//Создать и наполнить новую карточку, вставить в общий список.
const cardsList = new Section({
  renderer: (item) => {
    //1 создать экземпляр карточки.
    const newCard = new Card(item, '.card__template',
      {
        handleCardClick: () => {
          popupImage.open(item)
        }
      });
    //2 создать и наполнить карточку.
    const cardElement = newCard.generateCard();
    //3 вернуть карточку.
    cardsList.addItem(cardElement);
  }
}, '.cards__list');

//Наполнить сайт карточками с сервера.
api.getCardsInfo().then((array) => {
  cardsList.renderElements(array);
});


// СЛУШАТЕЛИ
// Cлушатель на кнопку редактирования.
editButton.addEventListener('click', () => {
  validatedFormEdit.clearForm();
  //Подтянуть данные пользователя в popup.
  const userInfoData = userInfo.getUserInfo();
  nameInput.value = userInfoData.name;
  aboutInput.value = userInfoData.about;
  popupEdit.open();
});

//Cлушатель на кнопку добавления новой карточки.
addButton.addEventListener('click', () => {
  validatedFormAdd.clearForm();
  popupAdd.open();
});

//Слушатель на область редактирования аватара.
overlay.addEventListener('click', () => {
  validatedFormAvatar.clearForm();
  popupEditAvatar.open();

}
)
