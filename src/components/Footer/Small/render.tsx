import './style.scss';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { PATHS } from 'Constants';
import Logo from 'Static/images/logo.svg';

function FooterSmall(props:RouteComponentProps):JSX.Element {
    return (
        <footer className='footer-small'>
            <div className="footer-small__container">
                <img src={Logo} className='footer-small__logo' alt='Logo' onClick={() => props.history.push(PATHS.root)}/>
                <p className='footer-small__rights'>©All rights reserved</p>
            </div>
        </footer>
    );
}

export default FooterSmall;
