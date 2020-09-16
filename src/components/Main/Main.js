import React, {useState, useEffect} from 'react';
import brushPath from '../../images/brush.svg';
import api from '../../utils/api.js';
import Card from '../Card/Card';

function Main ({onEditProfile, onAddPlace, onEditAvatar, handleCardClicked}) {
    const [userName, setUserName] = useState();
    const [userDescription, setUserDescription] = useState();
    const [userAvatar, setUserAvatar] = useState();
    const [isAvatarHovered, setIsAvatarHovered] = useState(false);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([
            api.getInitialCards(),
            api.getUserInfo()
        ]).then(res => {
            const [initialCards, userData] = res;
            setUserName(userData.name);
            setUserDescription(userData.about);
            setUserAvatar(userData.avatar);
            const cardsToSet = initialCards.map(item => {
                return {
                    imgLink: item.link,
                    name: item.name,
                    likes: Object.keys(item.likes).length,
                    cardId: item._id
                }
            })
            setCards(cardsToSet);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])//Эффект для обработки информации с сервера при загрузке страницы

/* Функции рендера кнопки на аватарке */
    const handleMouseEnterAvatar = () => {
        setIsAvatarHovered(true);
    }

    const handleMouseLeaveAvatar = () => {
        setIsAvatarHovered(false);
    }
    
    return (
        <main className="content">
        <section className="profile section">
            <div className="profile-avatar">
                <img 
                src={userAvatar} 
                alt={userName} 
                className="profile-avatar__image"
                onMouseEnter={handleMouseEnterAvatar}
                onMouseLeave={handleMouseLeaveAvatar}
                />
                <img 
                    src={brushPath} 
                    alt="Кисточка" 
                    className={`profile-avatar__brush ${isAvatarHovered && 'profile-avatar__brush_state_visible'}`} 
                    onClick={onEditAvatar}
                    onMouseEnter={handleMouseEnterAvatar}
                />
            </div>
            <div className="profile__info">
                <div className="profile__info-line">
                <h2 className="profile__name">{userName}</h2>
                    <button className="edit-button profile__edit-button" onClick={onEditProfile}/>
                </div>
                <p className="profile__description">{userDescription}</p>
            </div>
            <button className="add-button profile__add-button" onClick={onAddPlace}></button>
        </section>
        <section className="gallery section">
            {cards.map(card => <Card key={card.cardId} {...card} handleCardClicked={handleCardClicked}/>)}
        </section>
    </main>
    )
}

export default Main;