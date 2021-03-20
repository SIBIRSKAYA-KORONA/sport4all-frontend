import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './main.scss';

import store from 'Store/store';
import HomePage from 'Pages/Home/render';
import SignUpPage from 'Pages/SignUp/logic';
import TestGrid from 'Pages/TestGrid/render';
import CONST from 'Utils/constants';
import TeamCreatePage from 'Pages/Teams/Create/logic';
import TeamsPage from 'Pages/Teams/Teams/render';
import TeamPage from 'Pages/Teams/Team/logic';
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
                <Route path={CONST.PATHS.teams.create} component={TeamCreatePage}/>
                <Route path={CONST.PATHS.teams.id(null)} component={TeamPage}/>
                <Route path={CONST.PATHS.teams.base} component={TeamsPage}/>

                {/* Tournaments */}
                <Route path='/tournaments/create' component={TournamentCreatePage}/>
                <Route path='/tournaments/list' component={TournamentsListPage}/>
                <Route path='/tournaments/:tournamentId' component={TournamentsPage}/>

                <Route path={CONST.PATHS.profile} component={ProfilePage}/>

                {/* Auth */}
                <Route path='/signup' component={SignUpPage}/>
                <Route path={CONST.PATHS.login} component={LoginPage}/>

                {/* Test */}
                <Route path='/test-grid' component={TestGrid}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.querySelector(CONST.BASE_SELECTOR)
);
