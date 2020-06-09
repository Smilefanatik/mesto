//Иконки и кнопки.
const editButton = document.querySelector('.profile__edit-button');
const closeIcons = document.querySelectorAll('.popup__close-icon');
const addButton = document.querySelector('.profile__add-button');
//Попапы и формы.
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit-profile');
const popupAdd = document.querySelector('.popup_type_add-form');
const popupImage = document.querySelector('.popup_type_image');
const formEdit = document.querySelector('.popup__container_type_edit-profile');
const formAdd = document.querySelector('.popup__container_type_add-form');
//Поля ввода.
const nameInput = document.querySelector('.popup__input_element_name');
const jobInput = document.querySelector('.popup__input_element_job');
const placeInput = document.querySelector('.popup__input__element_place');
const linkInput = document.querySelector('.popup__input_element_link');
// Элементы профиля, куда должны быть вставлены значения value полей.
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
//Template и список элементов для вывода первых 6 карточек мест.
const cardTemplate = document.querySelector('.card__template').content;
const cardsList = document.querySelector('.cards__list');
//Элементы попапа с картинкой.
const popupElementImage = document.querySelector('.popup__image');
const popupElementText = document.querySelector('.popup__text');
//Page для делегирования.
const page = document.querySelector('.page');

//ФУНКЦИЯ ОТКРЫТИЯ И ЗАКРЫТИЯ ПОПАПА
//Функция, которая открывает или закрывает Popup.
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

//ФУНКЦИЯ ДОБАВЛЕНИЯ СЛУШАТЕЛЕЙ НА ЭЛЕМЕНТЫ КАРТОЧКИ
function addCardEvents(card) {
  //1 добавить слушателя на сердечко.
  const like = card.querySelector('.card__like');
  like.addEventListener('click', () => {
    like.classList.toggle('card__like_active');
  });
  //2 добавить слушателя на корзину.
  const bin = card.querySelector('.card__bin');
  bin.addEventListener('click', () => {
    const listItem = bin.closest('.card');
    listItem.remove();
  });
  //3 добавить слушателя на картинку с вызовом функции.
  const image = card.querySelector('.card__photo');
  image.addEventListener('click', (evt) => {
    //1 подтянуть изображение из карточки в попап.
    popupElementImage.src = evt.target.src;
    //2 подтянуть заголовок карточки в попап.
    popupElementText.textContent = evt.target.alt;
    //3 открыть попап.
    togglePopup(popupImage);
});
};

//ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ
function createCard(name, link) {
  //1 клонировать template.
  const card = cardTemplate.cloneNode(true);
  //2 вставить содержимое name в card.
  const title = card.querySelector('.card__title');
  title.textContent = name;
  //3 вставить содержимое link в атрибут src card.
  const image = card.querySelector('.card__photo');
  image.src = link;
  image.alt = name;
  //4 добавить слушателей на иконки и картинку.
  addCardEvents(card)
  //5 вернуть собранную карточку.
  return card;
}

//ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧЕК ИЗ МАССИВА
function addArrayItems(item) {
  //1 создать карточку.
  const newCard = createCard(item.name, item.link);
  //2 добавить новую карточку в список элементов.
  cardsList.append(newCard);
}

//ФУНКЦИЯ ДОБАВЛЕНИЯ НОВЫХ КАРТОЧЕК ПОЛЬЗОВАТЕЛЕМ
// Обработчик «отправки» формы.
function formAddSubmitHandler (evt) {
  //1 взять из формы название места и ссылку на картинку.
  const placeValue = placeInput.value;
  const linkValue = linkInput.value;
  //2 создать новую карточку.
  const newCard = createCard(placeValue, linkValue);
  //3 вставить карточку в начало списка.
  cardsList.prepend(newCard);
  //4 автоматически закрыть попап.
  togglePopup(popupAdd);
  //5 обнулить форму.
  formAdd.reset();
};
// Прикрепить обработчик к форме:
formAdd.addEventListener('submit', formAddSubmitHandler);

//ФУНКЦИЯ СОХРАНЕНИЯ ФОРМЫ РЕДАКТИРОВАНИЯ
// Обработчик «отправки» формы.
function formEditSubmitHandler (evt) {
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

//НАПОЛНЕНИЕ ELEMENTS 6 КАРТОЧКАМИ
//При загрузке на странице должно быть 6 карточек, которые добавит JavaScript на основе готового массива.
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
initialCards.forEach(addArrayItems);
