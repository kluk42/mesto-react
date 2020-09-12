import React from 'react';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js'
import ImagePopup from '../ImagePopup/ImagePopup'
import '../../index.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isPopupClosed, setisPopupClosed] = React.useState(true);

    const handleEditProfileButton = () => {
        setIsEditProfilePopupOpen(true);
        setisPopupClosed(false);
    }

    const handleAddPlaceButton = () => {
        setIsAddPlacePopupOpen(true);
        setisPopupClosed(false);
    }

    const handleEditAvatarButton = () => {
        setIsEditAvatarPopupOpen(true);
        setisPopupClosed(false);
    }

    const closeAllPopups = () => {
        setisPopupClosed(true);
    }

  return (
    <div className="root">
        <Header />
        <Main
            onEditProfile={handleEditProfileButton}
            onAddPlace={handleAddPlaceButton}
            onEditAvatar={handleEditAvatarButton}
        />
        <Footer />
        <ImagePopup />
        <PopupWithForm 
            title = 'Редактировать профиль'
            name = 'profile'
            isOpen = {isEditProfilePopupOpen}
            onClose={isPopupClosed}
            closePopup={closeAllPopups}
        >
            <fieldset className="form__input-container">
                    <label htmlFor="name-input" className="form__field">
                        <input type="text" placeholder="Имя пользователя" id="name-input" className="form__item form__item_content_name" required minlength="2" maxlength="40"/>
                        <span id="name-input-error" className="form__input-error"></span>
                    </label>
                    <label htmlFor="description-input" className="form__field">
                        <input type="text" placeholder="Род деятельности" id="description-input" className="form__item form__item_content_description" required minlength="2" maxlength="200"/>
                        <span id="description-input-error" className="form__input-error"></span>
                    </label>
                 </fieldset>
        </PopupWithForm>
        <PopupWithForm 
            title = 'Новое место'
            name = 'editor'
            isOpen = {isAddPlacePopupOpen}
            isClosed = {isPopupClosed}
            closePopup={closeAllPopups}
            >
                <fieldset className="form__input-container">
                     <label htmlFor="place-input" className="form__field">
                        <input type="text" placeholder="Название" id="place-input" className="form__item form__item_content_place-name" required minlength="1"/>
                        <span id="place-input-error" className="form__input-error"></span>
                     </label>
                     <label htmlFor="link-input" className="form__field">
                        <input type="url" placeholder="Ссылка на картинку" id="link-input" className="form__item form__item_content_link" required/>
                        <span id="link-input-error" className="form__input-error"></span>
                     </label>
                 </fieldset>
        </PopupWithForm>
        <PopupWithForm 
            title = 'Обновить аватар'
            name = 'avatar'
            isOpen = {isEditAvatarPopupOpen}
            isClosed = {isPopupClosed}
            closePopup={closeAllPopups}
            >
                <fieldset className="form__input-container">
                     <label htmlFor="avatar-input" className="form__field">
                        <input type="url" placeholder="Ссылка на аватар" id="avatar-input" className="form__item form__item_content_avatar" required/>
                        <span id="avatar-input-error" className="form__input-error"></span>
                     </label>
                 </fieldset>
            </PopupWithForm>
     <div class="popup popup_type_confirmation">
        <div class="popup__window">
            <h2 class="popup__header">Вы уверены?</h2>
            <button class="close-button popup__close-button" type="button"></button>
            <form class="form">
                <button class="submit-button submit-button_confirmation" type="submit">Да</button>
             </form>
        </div>
     </div>

     <template id="card-template">
        <div className="card">
            <button className="delete-button">
                <img src="./images/Lid.svg" alt="Крышка" className="delete-button__lid"/>
                <img src="./images/Bin.svg" alt="Урна" className="delete-button__bin"/>
            </button>
            <img src="./images/Karachaevsk.png" className="card__picture" alt="Карачаевск"/>
            <div className="card__bottom">
                <p className="card__name">Карачаево-Черкессия</p>
                <div className="like-section">
                    <button className="like-button"></button>
                    <p className="like-section__likes-counter"></p>
                </div>
            </div>
        </div>
     </template>
    </div>
  );
}

export default App;