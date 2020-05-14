// Находим форму в DOM
const form = document.querySelector('.popup__container'); // Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    const nameInput = document.querySelector('.popup__input_element_name');// Воспользуйтесь инструментом .querySelector()
    const jobInput = document.querySelector('.popup__input_element_job');// Воспользуйтесь инструментом .querySelector()

    // Получите значение полей из свойства value
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей
    const profileName = document.querySelector('.profile__name');
    const profileJob = document.querySelector('.profile__job');
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameValue;
    profileJob.textContent = jobValue;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
form.addEventListener('submit', formSubmitHandler);
