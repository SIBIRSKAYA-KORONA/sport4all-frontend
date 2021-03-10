import * as React from 'react';
import './style.scss';

import Footer from 'Components/Footer/render';
import PersonInputRender from 'Components/PersonInput/logic';
import PersonTable from 'Components/PersonTable/logic';
import PersonTableButton from 'Components/PersonTableButton/logic';

function DemoPage() {
    return (
        <div className="page">
            <div className="demo">
                <h1>Demo</h1>
                <PersonInputRender />
                <PersonTable />
                <PersonTableButton />
            </div>
            <Footer />
        </div>
    );
}

export default DemoPage;
