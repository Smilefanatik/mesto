const editButton = document.querySelector('.profile__edit-button');
const closeIcons = document.querySelectorAll('.popup__close-icon');
const addButton = document.querySelector('.profile__add-button');
//Подключаем попапы и формы
const popupEdit = document.querySelector('.popup_type_edit-profile');
const popupAdd = document.querySelector('.popup_type_add-form');
const formEdit = document.querySelector('.popup__container_type_edit-profile');
const formAdd = document.querySelector('.popup__container_type_add-form');
//Подключаем поля ввода
const nameInput = document.querySelector('.popup__input_element_name');
const jobInput = document.querySelector('.popup__input_element_job');
const placeInput = document.querySelector('.popup__input__element_place');
const linkInput = document.querySelector('.popup__input_element_link');
// Элементы профиля, куда должны быть вставлены значения value полей.
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
//Подключаем template и список элементов для вывода первых 6 карточек мест
const elementTemplate = document.querySelector('.element__template').content;
const elementsList = document.querySelector('.elements__list');


//ФУНКЦИОНАЛ ОТКРЫТИЯ И ЗАКРЫТИЯ ПОПАПА
//Функция, которая открывает или закрывает Popup.
function openClose(popup) {
  popup.classList.toggle('popup_opened');
}

//Cлушатель на кнопку редактирования.
editButton.addEventListener('click', function () {
  openClose(popupEdit);
//Подтянуть из profileName и profileJob пользователя данные поля формы
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

//Cлушатель на кнопку редактирования.
addButton.addEventListener('click', function () {
  openClose(popupAdd);
});

//Cлушатель на крестик.
closeIcons.forEach(function (icon) {
  icon.addEventListener('click', function (evt) {
    const whichPopup = evt.target.closest('div');
    openClose(whichPopup);
  });
});



//ФУНКЦИОНАЛ ДОБАВЛЕНИЯ НОВЫХ КАРТОЧЕК ПОЛЬЗОВАТЕЛЕМ
// Обработчик «отправки» формы
function formAddSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы определим свою логику отправки.

//1 взять из формы название места и ссылку на картинку
const placeValue = placeInput.value;
const linkValue = linkInput.value;
//2 создать новую карточку
const element = elementTemplate.cloneNode(true);
//3 вставить в нее значения из формы
element.querySelector('.element__title').textContent = placeValue;
element.querySelector('.element__photo').src = linkValue;
//4 добавить слушателя на сердечко
element.querySelector('.element__like').addEventListener('click', function (evt) {
  evt.target.classList.toggle('element__like_active');
});
//5 добавить слушателя на корзину
const bin = element.querySelector('.element__bin');
bin.addEventListener('click', function () {
  const listItem = bin.closest('.element');
  listItem.remove();
});
//6 вставить карточку в начало списка
elementsList.prepend(element);
//7 автоматически закрыть попап
popup.classList.remove('popup_opened');
}

// Прикрепить обработчик к форме:
formAdd.addEventListener('submit', formAddSubmitHandler);


//ФУНКЦИОНАЛ СОХРАНЕНИЯ ФОРМЫ РЕДАКТИРОВАНИЯ
// Обработчик «отправки» формы
function formEditSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                          // Так мы определим свою логику отправки.

    // Получить значение полей из свойства value
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    // Вставить новые значения с помощью textContent
    profileName.textContent = nameValue;
    profileJob.textContent = jobValue;

    //Автоматически закрыть попап
    popup.classList.remove('popup_opened');
}

// Прикрепить обработчик к форме:
formEdit.addEventListener('submit', formEditSubmitHandler);


//НАПОЛНЕНИЕ ELEMENTS 6 КАРТОЧКАМИ
//При загрузке на странице должно быть 6 карточек, которые добавит JavaScript на основе готового массива.
//Готовый массив:
const initialCards = [
  {
      name: 'Лес',
      link: './images/photo_sequoia.jpg'
  },
  {
      name: 'ГрибочкиГрибочки',
      link: './images/photo_bubbles.jpg'
  },
  {
      name: 'Крапива',
      link: './images/photo4.jpg'
  },
  {
      name: 'Рабочая вода',
      link: './images/photo_carpet.jpg'
  },
  {
      name: 'Пати бас',
      link: './images/photo5.jpg'
  },
  {
      name: 'Мак',
      link: './images/photo_meadow.jpg'
  }
];

//Наполнить element содержимым: методом forEach добавить заголовок и изображение в карточку.
initialCards.forEach(function (item) {
  //1 клонировать template
  const element = elementTemplate.cloneNode(true);
  //2 вставить содержимое name в element
  element.querySelector('.element__title').textContent = item.name;
  //3 вставить содержимое link в атрибут src element
  element.querySelector('.element__photo').src = item.link;
  //4 добавить слушателя на сердечко
  element.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  //5 добавить слушателя на корзину
  const bin = element.querySelector('.element__bin');
  bin.addEventListener('click', function () {
    const listItem = bin.closest('.element');
    listItem.remove();
  });
  //6 отобразить на странице
  elementsList.append(element);
})
