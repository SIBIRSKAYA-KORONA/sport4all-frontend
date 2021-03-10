import * as React from 'react';
import './style.scss';

import Footer from 'Components/Footer/render';
import Thanks from 'Components/Thanks/render';

function HomePage() {
    return (
        <div className='page'>
            <Thanks />
            <Footer />
        </div>
    )
}

export default HomePage;
