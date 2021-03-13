import * as React from 'react';
import './style.scss';

import Footer from 'Components/Footer/render';
import Thanks from 'Components/Thanks/render';
import Header from 'Components/Header/render';

function HomePage() {
    return (
        <div className='page'>
            <Header />
            <Thanks />
            <Footer />
        </div>
    )
}

export default HomePage;
