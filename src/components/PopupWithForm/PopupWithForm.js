import React from 'react';

const PopupWithForm = ({title, name, isOpen, onClose, children}) => {
    return (
        <div className={
            `popup popup_type_${name}
             ${isOpen && 'popup-opener'}
    `}>
            <div className="popup__window">
              <h2 className="popup__header">{title}</h2>
              <button className="close-button popup__close-button" type="button" onClick={onClose}></button>
              <form className="form" name={name} noValidate>
                    {children}
                    <button className="submit-button form__submit-button" type="submit">Сохранить</button>
              </form>
         </div>
     </div>
    )
}

export default PopupWithForm;