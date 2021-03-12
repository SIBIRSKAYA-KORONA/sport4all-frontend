import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './main.scss';

import store from './store/store';
import HomePage from 'Pages/Home/render';
import DemoPage from 'Pages/Demo/render';
import ContributionsPage from 'Pages/Contribute/render';
import SetupsPage from 'Pages/Setups/render';
import TestGrid from 'Pages/TestGrid/render';
import {CONST} from 'Constants';

render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/demo' component={DemoPage}/>
                <Route path='/setups' component={SetupsPage}/>
                <Route path='/contribute' component={ContributionsPage}/>
                <Route path='/test-grid' component={TestGrid}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.querySelector(CONST.BASE_SELECTOR)
);
