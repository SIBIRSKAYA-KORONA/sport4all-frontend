import * as React from 'react';
import { Link } from 'react-router-dom';

import Footer from 'Components/Footer/render';
import Header from 'Components/Header/render';

function TournamentsListPage() {


    return (
        <div className='page'>
            <Header/>
            <div>
                <Link to='/tournaments/list' className='footer__link'>All Tournaments</Link>
                <Link to='/tournaments/create' className='footer__link'>Create Tournament</Link>
            </div>
            <Footer/>
        </div>
    )
}

export default TournamentsListPage;
