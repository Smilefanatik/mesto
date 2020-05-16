const editButton = document.querySelector('.profile__edit-button');
const closeIcon = document.querySelector('.popup__close-icon');
const popup = document.querySelector('.popup');
const form = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__input_element_name');
const jobInput = document.querySelector('.popup__input_element_job');
    // Элементы, куда должны быть вставлены значения value полей
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');


//ФУНКЦИОНАЛ ОТКРЫТИЯ И ЗАКРЫТИЯ ПОПАПА
//Добавить слушателя на кнопку редактирования.
editButton.addEventListener('click', openClose);

//Функция, которая открывает Popup.
function openClose() {
    //Добавить модификатор.
  popup.classList.add('popup_opened');
  //Подтянуть из profileName и profileJob пользователя данные поля формы
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

//Добавить слушателя на кнопку закрытия popup.
closeIcon.addEventListener('click', close);

//Функция, которая закрывает Popup.
function close() {
  //Удалить модификатор.
  popup.classList.remove('popup_opened');
}



//ФУНКЦИОНАЛ СОХРАНЕНИЯ ФОРМЫ
// Обработчик «отправки» формы
function formSubmitHandler (evt) {
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
form.addEventListener('submit', formSubmitHandler);
