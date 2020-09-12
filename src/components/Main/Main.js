import React from 'react';
import brushPath from '../../images/brush.svg'

function Main ({onEditProfile, onAddPlace, onEditAvatar}) {
    return (
        <main className="content">
        <section className="profile section">
            <div className="profile-avatar">
                <img alt="Жак-Ив Кусто" className="profile-avatar"/>
                <img src={brushPath} alt="Кисточка" className="profile-avatar__brush"/>
            </div>
            <div className="profile__info">
                <div className="profile__info-line">
                    <h2 className="profile__name">Жак-Ив Кусто</h2>
                    <button className="edit-button profile__edit-button"></button>
                </div>
                <p className="profile__description">Исследователь океана</p>
            </div>
            <button className="add-button profile__add-button"></button>
        </section>
        <section className="gallery section"></section>
    </main>
    )
}

export default {Main};