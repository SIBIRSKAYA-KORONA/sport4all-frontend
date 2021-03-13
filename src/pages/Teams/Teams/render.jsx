import * as React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

import Footer from 'Components/Footer/render';
import Header from 'Components/Header/render';

function TeamsPage() {
    return (
        <div className='page'>
            <Header/>
            <div>
                {/*<Link to='/teams/search' className='footer__link'>Search Team</Link>*/}
                <Link to='/teams/list' className='footer__link'>All Teams</Link>
                <Link to='/teams/create' className='footer__link'>Create Team</Link>
            </div>
            <Footer/>
        </div>
    )
}

export default TeamsPage;
