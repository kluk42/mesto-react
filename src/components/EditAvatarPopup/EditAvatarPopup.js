import React, {useRef} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarRef = useRef();

    const handleSubmit = (evt) => {
        evt.preventDefault();
      
        onUpdateAvatar(avatarRef.current.value);
      }
      
    return(
        <PopupWithForm 
                title = 'Обновить аватар'
                name = 'avatar'
                isOpen = {isOpen}
                onClose={onClose}
                onSubmit={handleSubmit}
                >
                    <fieldset className="form__input-container">
                        <label htmlFor="avatar-input" className="form__field">
                            <input 
                                type="url" 
                                placeholder="Ссылка на аватар" 
                                id="avatar-input" 
                                className="form__item form__item_content_avatar" 
                                required
                                ref={avatarRef}
                            />
                            <span id="avatar-input-error" className="form__input-error"></span>
                        </label>
                    </fieldset>
                </PopupWithForm>
    )
}

export default EditAvatarPopup