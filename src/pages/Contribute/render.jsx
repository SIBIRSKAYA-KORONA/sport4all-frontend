import * as React from 'react';
import './style.scss';

import Footer from 'Components/Footer/render';
import ContributionRender from 'Components/Contribution/render';
import Data from 'Static/data';

function ContributionsPage() {
    return (
        <div className='page'>
            <div className='contribute'>
                <h1>Contribute</h1>
                <div className="contribute__ways">
                    {Data.Contributions.map(c => <ContributionRender {...c} key={c.link}/>)}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ContributionsPage;
