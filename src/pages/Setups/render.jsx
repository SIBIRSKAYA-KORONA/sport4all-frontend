import * as React from 'react';
import './style.scss';

import SetupsList from 'Components/SetupsList/render';
import Footer from 'Components/Footer/render';
import Data from 'Static/data';

function SetupsPage() {
    return (
        <div className='page'>
            <div className="setups">
                <h1>Setups</h1>
                <SetupsList setups={Data.Setups}/>
            </div>
            <Footer />
        </div>
    );
}

export default SetupsPage;
