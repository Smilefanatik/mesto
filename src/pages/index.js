import './index.css';

import Card from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { object } from '../utils/utils.js';


const overlay = document.querySelector('.profile__overlay');
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

//Popup с всплывающим изображением.
const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

//Popup с формой редактирования профиля.
const popupEdit = new PopupWithForm('.popup_type_edit-profile',
  {
    submitHandler: (values) => {
      popupEdit.renderLoading(true);
      //1 Отправить на сервер новые данные.
      api.changeProfileData(values)
        .then((data) => {
          //2 подставить новые значения полей в профиль пользователя.
          userInfo.setUserInfo(data);
        })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        })
        .finally(() => {
          //3 автоматически закрыть popup.
          popupEdit.close();
          popupEdit.renderLoading(false, 'Сохранить');
        })
    }
  });

popupEdit.setEventListeners();

//Popup редактирования аватара.
const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', {
  submitHandler: (values) => {
    popupEditAvatar.renderLoading(true);
    //1 Отправить на сервер информацию об аватаре.
    api.changeAvatar(values)
      .then((response) => {
        //1 Изменить аватар.
        userInfo.setAvatar(response);
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        //2 Закрыть попап.
        popupEditAvatar.close();
        popupEditAvatar.renderLoading(false, 'Сохранить');
      })
  }
});
popupEditAvatar.setEventListeners();


//Popup удаления карточки.
const popupConfirm = new PopupWithForm('.popup_type_confirm', {
  submitHandler: () => { }
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

//Профиль пользователя.
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar'
});


//Получить информацию о пользователе и массив карточек, вывести карточки на сайт.
Promise.all([api.getUserInfo(), api.getCardsInfo()])
  .then((data) => {
    //Ответ с сервера с информацией пользователя.
    const userData = data[0];
    //Ответ с сервера с массивом карточек.
    const initialCardsInfo = data[1];

    //Вывести начальные данные пользователя.
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData);
    const userId = userData._id;

    //Проверка на совпадение id пользователя и владельца карточки.
    function isIdEqual(item) {
      const isIdEqual = userId === item.owner._id;
      return isIdEqual;
    }

    //Проверка на наличие собственных лайков на карточке.
    function isCardLiked(item) {
      const likesArray = item.likes;

      const isLiked = likesArray.some(function (elem) {
        return elem._id === userId;
      })
      return isLiked;
    }

    //Колбэк для создания новой карточки и добавления в список.
    function createNewCard(item, isLiked) {
      //1 создать экземпляр карточки.
      const newCard = new Card(item, '.card__template', isLiked,
        {//Колбэк по клику на картинку.
          handleCardClick: () => {
            popupImage.open(item)
          }
        },
        {//Колбэк по клику на корзину.
          handleBinClick: () => {
            popupConfirm.open();
            popupConfirm.setSubmitHandler(function () {
              api.deleteCard(item._id)
                .then(() => {
                  //1 Удалить карточку.
                  newCard.deleteCard();
                })
                .catch((error) => {
                  console.log(`Ошибка: ${error}`);
                })
                .finally(() => {
                  //2 Закрыть попап.
                  popupConfirm.close();
                })
            })
          }
        },
        {
          handleLikeClick: (isLiked) => {
            if (isLiked) {
              api.deleteLike(item._id)
                .then((response) => {
                  newCard.toggleLike(response.likes)
                })
                .catch((error) => {
                  console.log(`Ошибка: ${error}`);
                })
            } else {
              api.addLike(item._id)
                .then((response) => {
                  newCard.toggleLike(response.likes)
                })
                .catch((error) => {
                  console.log(`Ошибка: ${error}`);
                })
            }
          }
        }
      );
      //2 наполнить карточку.
      const cardElement = newCard.generateCard(isIdEqual(item));
      //3 вставить карточку в начало списка.
      cardsList.addItem(cardElement);
    }

    //Создать секцию для вывода карточек с сервера.
    const cardsList = new Section(initialCardsInfo, {
      renderer: (item) => {
        createNewCard(item, isCardLiked(item));
      }
    }, '.cards__list');

    //Вывести карточки на сайт.
    cardsList.renderElements();

    // PopUp с формой добавления новой карточки.
    const popupAdd = new PopupWithForm('.popup_type_add-form',
      {
        submitHandler: (values) => {
          popupAdd.renderLoading(true);
          //1 Отправить данные новой карточки на сервер.
          api.addNewCard(values)
            .then((item) => {
              //2 Создать карточку.
              createNewCard(item);
            })
            .catch((error) => {
              console.log(`Ошибка: ${error}`);
            })
            .finally(() => {
              //3 автоматически закрыть popup.
              popupAdd.close();
              popupAdd.renderLoading(false, 'Создать');
            })
          //4 обнулить форму.
          validatedFormAdd.clearForm();
        }
      }
    );
    popupAdd.setEventListeners();

    //Cлушатель на кнопку добавления новой карточки.
    addButton.addEventListener('click', () => {
      validatedFormAdd.clearForm();
      popupAdd.open();
    })
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
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



//Слушатель на область редактирования аватара.
overlay.addEventListener('click', () => {
  validatedFormAvatar.clearForm();
  popupEditAvatar.open();
})
