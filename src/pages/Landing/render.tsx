import './style.scss';
import * as React from 'react';

import Thanks from 'Components/Thanks/render';
import BasePage from 'Components/BasePage/render';
import { RouteComponentProps } from 'react-router-dom';


const LandingPage = (props:RouteComponentProps):JSX.Element => (
    <BasePage {...props}>
        <Thanks/>
    </BasePage>
);

export default LandingPage;
