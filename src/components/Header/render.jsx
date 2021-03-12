import * as React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

import Logo from 'Static/images/logo.jpg';

function Header() {
    return (
        <div className='header'>
            <Link to='/' className='header__avatar'>
                <img src={Logo} alt='Logo'/>
            </Link>
            <div className='header__list'>
                <Link to='/teams' className='header__link'>Teams</Link>
            </div>
        </div>
    );
}

export default Header;
