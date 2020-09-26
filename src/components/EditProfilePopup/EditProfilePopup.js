import React, {useState, useContext, useEffect} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import {CurrentUserContext} from '../Contexts/CurrentUserContext';

function EditProfilePopup ({isOpen, onClose, onUpdateUser}) {
    const [name, setName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);
    
    const handleNameChange = (evt) => {
        setName(evt.target.value)
    }

    const handleUserDescriptionChange = (evt) => {
        setUserDescription(evt.target.value)
    }

    useEffect(() => {
        setName(currentUser.name);
        setUserDescription(currentUser.about);
      }, [currentUser]);

      const handleSubmit = (evt) => {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
          newName: name,
          about: userDescription,
        });
      } 

    return(
        <PopupWithForm 
                title = 'Редактировать профиль'
                name = 'profile'
                isOpen = {isOpen}
                onClose={onClose}
                onSubmit={handleSubmit}
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
                                onChange={handleNameChange}
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
                                onChange={handleUserDescriptionChange}
                            />
                            <span id="description-input-error" className="form__input-error"></span>
                        </label>
                    </fieldset>
                </PopupWithForm>
    )
}

export default EditProfilePopup