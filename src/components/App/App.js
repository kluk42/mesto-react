import React, {useEffect, useState} from 'react';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js'
import ImagePopup from '../ImagePopup/ImagePopup.js'
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import api from '../../utils/Api.js';
import {CurrentUserContext} from '../Contexts/CurrentUserContext';
import {CardsContext} from '../Contexts/CardsContext';
import {cardsFromServerReprocessor} from '../../utils/utils'

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImgPopupOpen, setIsImgPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [cards, setCards] = useState([]);

    useEffect (() => {
        const getUserAndCards =  async () => {
            const userInfo = await api.getUserInfo();
            const cardsFromServer = await api.getInitialCards();
            const cardsToSet = cardsFromServer.map(item => {
                return cardsFromServerReprocessor(item, userInfo)
            })
            setCards(cardsToSet);
            setCurrentUser(userInfo);
        }
        getUserAndCards()
    }, [])

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

    const onUpdateUser = async (userData) => {
        const newUser = await api.sendUserInfo(userData);
        setCurrentUser(newUser);
        closeAllPopups()
    }

    const onUpdateAvatar = async (avatarLink) => {
        const newUser = await api.uploadAvatar(avatarLink);
        setCurrentUser(newUser);
        closeAllPopups()
    }

    const handleCardLike = async (card) => {
        // Отправляем запрос в API и получаем обновлённые данные карточки
        const newCardFromServer = card.isLiked ? await api.dislikeCard(card.cardId) : await api.likeCard(card.cardId);
        const newCard = cardsFromServerReprocessor(newCardFromServer, currentUser)
        
        const newCards = cards.map((c) => {
            const cardToReturn = c.cardId === card.cardId ? newCard : c;
            return cardToReturn
        });
        setCards(newCards);
    }

    const onCardDelete = async (card) => {
        await api.deleteCard(card.cardId);
        const newCards = cards.filter(item => {
            return item.cardId !== card.cardId
        })
        setCards(newCards)
    }

    const handleAddPlaceSubmit = async (card) => {
        const newCard = await api.uploadCard(card);
        const cardToSet = cardsFromServerReprocessor(newCard, currentUser);
        setCards([...cards, cardToSet])
        setIsAddPlacePopupOpen(false)
    }

  return (
    <div className="root">
        <CurrentUserContext.Provider value={currentUser}>
            <CardsContext.Provider value={cards}>
                <Header />
                <Main
                onEditProfile={handleEditProfileButton}
                onAddPlace={handleAddPlaceButton}
                onEditAvatar={handleEditAvatarButton}
                handleCardClicked={handleCardClicked}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={onCardDelete}
                />
                <Footer />
                <ImagePopup 
                card = {selectedCard}
                isOpen = {isImgPopupOpen}
                onClose = {closeAllPopups}
                />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={onUpdateUser} /> 
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={onUpdateAvatar} />
            </CardsContext.Provider>
        </CurrentUserContext.Provider>
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