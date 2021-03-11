import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './main.scss';

import store from './store/store';
import HomePage from 'Pages/Home/render';
import DemoPage from 'Pages/Demo/render';
import ContributionsPage from 'Pages/Contribute/render';
import {CONST} from 'Constants';
import TeamCreatePage from 'Pages/Team/Create/logic';
import TeamListPage from 'Pages/Team/List/logic';

render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/demo' component={DemoPage}/>
                <Route path='/team/create' component={TeamCreatePage}/>
                <Route path='/team/list' component={TeamListPage}/>
                <Route path='/contribute' component={ContributionsPage}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.querySelector(CONST.BASE_SELECTOR)
);
