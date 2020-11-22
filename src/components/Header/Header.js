import React from 'react';
import headerLogoPath from '../../images/header-logo.svg';
import { Link } from 'react-router-dom';

function Header ({ link, email, handleLogoutBtn }) {
    console.log(email)
    return (
        <header className="header">
            <img src={headerLogoPath} alt="Mesto-Russia" className="header__logo"/>
            {email && <div className="header__wrapper">
                <p className="header__email">{email}</p>
                <button className="header__sign-out-btn" onClick={handleLogoutBtn}>{link.linkText}</button>
            </div>}
            {!email && <Link className="header__link" to={link.to}>{link.linkText}</Link>}
        </header> 
    )
}

export default Header;