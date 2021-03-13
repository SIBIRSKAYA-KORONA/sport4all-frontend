import * as React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className='header'>
            <div className='header__list'>
                <Link to='/' className='header__link'>Главная</Link>
                <Link to='/teams' className='header__link'>Команды</Link>
                <Link to='/signup' className='header__link'>Sign Up</Link>
                <Link to='/login' className='header__link'>Login</Link>
            </div>
        </div>
    );
}

export default Header;
