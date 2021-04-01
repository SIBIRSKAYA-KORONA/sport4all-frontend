import './style.scss';
import * as React from 'react';

import Thanks from 'Components/Thanks/render';
import BasePage from 'Components/BasePage/render';

const HomePage = (props) => (
    <BasePage {...props}>
        <Thanks/>
    </BasePage>
)

export default HomePage;
