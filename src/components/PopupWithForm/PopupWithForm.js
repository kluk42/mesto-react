import React from 'react';

const PopupWithForm = ({title, name, children}) => {
    return (
        <div className={`popup popup_type_${name}`}>
            <div className="popup__window">
              <h2 className="popup__header">{title}</h2>
              <button className="close-button popup__close-button" type="button"></button>
              <form className="form" name={name} novalidate>
                    {children}
                    <button className="submit-button form__submit-button" type="submit">Сохранить</button>
              </form>
         </div>
     </div>
    )
}

export default PopupWithForm;