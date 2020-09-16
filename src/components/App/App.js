import React, {useState} from 'react';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js'
import ImagePopup from '../ImagePopup/ImagePopup.js'
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImgPopupOpen, setIsImgPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});

    const handleEditProfileButton = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleAddPlaceButton = () => {
        setIsAddPlacePopupOpen(true);
    }

    const handleEditAvatarButton = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImgPopupOpen(false);
    }

    const handleCardClicked = (evt) => {
        const card = {
            imgLink: evt.target.src,
            description: evt.target.alt
        }
        setSelectedCard(card);
        setIsImgPopupOpen(true);
    }

  return (
    <div className="root">
        <Header />
        <Main
            onEditProfile={handleEditProfileButton}
            onAddPlace={handleAddPlaceButton}
            onEditAvatar={handleEditAvatarButton}
            handleCardClicked={handleCardClicked}
        />
        <Footer />
        <ImagePopup 
        card = {selectedCard}
        isOpen = {isImgPopupOpen}
        onClose = {closeAllPopups}
        />
        <PopupWithForm 
            title = 'Редактировать профиль'
            name = 'profile'
            isOpen = {isEditProfilePopupOpen}
            onClose={closeAllPopups}
        >
            <fieldset className="form__input-container">
                    <label htmlFor="name-input" className="form__field">
                        <input
                            type="text" 
                            placeholder="Имя пользователя" 
                            id="name-input" 
                            className="form__item form__item_content_name" 
                            required 
                            minLength="2" 
                            maxLength="40"
                        />
                        <span id="name-input-error" className="form__input-error"></span>
                    </label>
                    <label htmlFor="description-input" className="form__field">
                        <input 
                            type="text" 
                            placeholder="Род деятельности" 
                            id="description-input" 
                            className="form__item form__item_content_description" 
                            required 
                            minLength="2" 
                            maxLength="200"
                        />
                        <span id="description-input-error" className="form__input-error"></span>
                    </label>
                 </fieldset>
        </PopupWithForm>
        <PopupWithForm 
            title = 'Новое место'
            name = 'editor'
            isOpen = {isAddPlacePopupOpen}
            onClose={closeAllPopups}
            >
                <fieldset className="form__input-container">
                     <label htmlFor="place-input" className="form__field">
                        <input 
                            type="text" 
                            placeholder="Название" 
                            id="place-input" 
                            className="form__item form__item_content_place-name" 
                            required 
                            minLength="1"
                        />
                        <span id="place-input-error" className="form__input-error"></span>
                     </label>
                     <label htmlFor="link-input" className="form__field">
                        <input 
                            type="url" 
                            placeholder="Ссылка на картинку" 
                            id="link-input" 
                            className="form__item form__item_content_link" 
                            required
                        />
                        <span id="link-input-error" className="form__input-error"></span>
                     </label>
                 </fieldset>
        </PopupWithForm>
        <PopupWithForm 
            title = 'Обновить аватар'
            name = 'avatar'
            isOpen = {isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            >
                <fieldset className="form__input-container">
                     <label htmlFor="avatar-input" className="form__field">
                        <input 
                            type="url" 
                            placeholder="Ссылка на аватар" 
                            id="avatar-input" 
                            className="form__item form__item_content_avatar" 
                            required
                        />
                        <span id="avatar-input-error" className="form__input-error"></span>
                     </label>
                 </fieldset>
            </PopupWithForm>
     <div className="popup popup_type_confirmation">
        <div className="popup__window">
            <h2 className="popup__header">Вы уверены?</h2>
            <button className="close-button popup__close-button" type="button"/>
            <form className="form">
                <button className="submit-button submit-button_confirmation" type="submit">Да</button>
             </form>
        </div>
     </div>
    </div>
  );
}

export default App;