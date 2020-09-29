import React, {useState} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm'

function ConfirmationPopup ({isOpen, onClose, cardId, action}) {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (evt) => {
        evt.preventDefault();
        setIsLoading(true);
        action(cardId);
        onClose();
        setIsLoading(false);
    }    

    return(
        <PopupWithForm 
            title = 'Вы уверены?'
            name = 'confirmation'
            isOpen = {isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            hasInvalid={false}
            isLoading={isLoading}
            buttonTitle='Да'
        >
        </PopupWithForm>
    )
}

export default ConfirmationPopup