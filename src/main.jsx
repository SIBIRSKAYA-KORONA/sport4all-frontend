import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './main.scss';

import store from './store/store';
import HomePage from 'Pages/Home/render';
import SignUpPage from 'Pages/SignUp/logic';
import TestGrid from 'Pages/TestGrid/render';
import {CONST} from 'Constants';
import TeamCreatePage from 'Pages/Teams/Create/logic';
import TeamListPage from 'Pages/Teams/List/logic';
import TeamsPage from 'Pages/Teams/Teams/render';
import TournamentCreatePage from 'Pages/Tournaments/Create/logic';
import TournamentsPage from 'Pages/Tournaments/Tournaments/logic';
import TournamentsListPage from 'Pages/Tournaments/List/render';
import LoginPage from 'Pages/Login/logic';
import ProfilePage from 'Pages/Profile/logic';

render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={HomePage}/>

                {/* Teams */}
                <Route path='/teams/create' component={TeamCreatePage}/>
                <Route path='/teams/list' component={TeamListPage}/>
                {/*<Route path='/teams/search' component={TeamListPage}/>*/}
                <Route path='/teams' component={TeamsPage}/>

                {/* Tournaments */}
                <Route path='/tournaments/create' component={TournamentCreatePage}/>
                <Route path='/tournaments/list' component={TournamentsListPage}/>
                {/* TODO: fix tournament routing*/}
                <Route path='/tournaments/:tournamentId' component={TournamentsPage}/>

                <Route path='/profile' component={ProfilePage}/>

                {/* Auth */}
                <Route path='/signup' component={SignUpPage}/>
                <Route path='/login' component={LoginPage}/>

                {/* Test */}
                <Route path='/test-grid' component={TestGrid}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.querySelector(CONST.BASE_SELECTOR)
);
