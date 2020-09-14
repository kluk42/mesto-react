import lidPath from '../../images/Lid.svg';
import binPath from '../../images/Bin.svg';
import React from 'react';

function Card ({imgLink, name, likes, handleCardClicked}) {
    return(
        <div className="card">
            <button className="delete-button">
                <img src={lidPath} alt="Крышка" className="delete-button__lid"/>
                <img src={binPath} alt="Урна" className="delete-button__bin"/>
            </button>
            <img src={imgLink} className="card__picture" alt={name} onClick={handleCardClicked}/>
            <div className="card__bottom">
                <p className="card__name">{name}</p>
                <div className="like-section">
                    <button className="like-button"></button>
    <p className="like-section__likes-counter">{likes}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;