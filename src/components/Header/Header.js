import React from 'react';
import headerLogoPath from '../../images/header-logo.svg';

function Header () {
    return (
        <header className="header">
            <img src={headerLogoPath} alt="Mesto-Russia" className="header__logo"/>
        </header> 
    )
}

export default Header;