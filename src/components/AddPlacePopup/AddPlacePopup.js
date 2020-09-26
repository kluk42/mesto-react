import React, {useState} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function AddPlacePopup ({isOpen, onClose, onAddPlace}) {
    const [imgLink, setImgLink] = useState('');
    const [placeName, setPlaceName] = useState('');

    const handleLinkChange = (evt) => {
        setImgLink(evt.target.value)
    }

    const handleNameChange = (evt) => {
        setPlaceName(evt.target.value)
    }

    const handleSubmit = (evt) => {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
          link: imgLink,
          name: placeName
        });
      }

    return (
        <PopupWithForm 
                title = 'Новое место'
                name = 'editor'
                isOpen = {isOpen}
                onClose={onClose}
                onSubmit={handleSubmit}
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
                                onChange={handleNameChange}
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
                                onChange={handleLinkChange}
                            />
                            <span id="link-input-error" className="form__input-error"></span>
                        </label>
                    </fieldset>
                </PopupWithForm>
    )
}

export default AddPlacePopup