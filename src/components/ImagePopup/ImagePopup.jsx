import React from 'react';

const ImagePopup = () => {
    return (
        <div className="popup popup_type_picture">
            <div className="popup__envelope">
                <button className="close-button popup__close-button" type="button"></button>
                <img src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg" alt="Архыз" className="popup__picture"/>
                <p className="popup__sign">Архыз</p>
            </div>
        </div>
    )
}

export default ImagePopup