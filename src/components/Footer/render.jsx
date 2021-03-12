import * as React from 'react';
import './style.scss';

import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className='footer'>
            <div className='footer__list'>
                <Link to='/' className='footer__link'>Home</Link>
                <Link to='/setups' className='footer__link'>Setups</Link>
            </div>
            <a className='footer__avatar' href='https://github.com/EgorBedov' target='_blank' rel='noopener noreferrer'>
                <img src='https://avatars1.githubusercontent.com/u/55828280?s=60&u=cf6facefae0859de29544bea5db2be3a19d46bbc&v=4' alt='Author'/>
            </a>
            <div className='footer__list'>
                <Link to='/demo' className='footer__link'>Demo</Link>
                <Link to='/contribute' className='footer__link'>Contribute</Link>
                <Link to='/test-grid' className='footer__link'>Test grid</Link>
            </div>
        </div>
    );
}

export default Footer;
