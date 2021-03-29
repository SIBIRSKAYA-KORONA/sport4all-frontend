import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './main.scss';

import store from 'Store/store';
import HomePage from 'Pages/Home/render';
import SignUpPage from 'Pages/SignUp/logic';
import TestGrid from 'Pages/TestGrid/render';
import CONST from 'Utils/constants';
import TeamCreatePage from 'Pages/Teams/Create/render';
import TeamsPage from 'Pages/Teams/Team/render';
import TeamPage from 'Pages/Teams/Team/logic';
import TournamentCreatePage from 'Pages/Tournaments/Create/logic';
import TournamentsPage from 'Pages/Tournaments/Tournament/logic';
import TournamentsListPage from 'Pages/Tournaments/List/render';
import LoginPage from 'Pages/Login/logic';
import ProfilePage from 'Pages/Profile/render';
import AuthedRoute from 'Utils/AuthedRoute';
import MeetingPage from 'Pages/Meeting/logic';
import TournamentMeetingsListPage from 'Pages/Tournaments/MeetingsList/render';
import {ProfileSections, ProfileSettingsSections} from 'Utils/enums';

render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={HomePage}/>

                {/* Teams */}
                <AuthedRoute path={CONST.PATHS.teams.create} component={TeamCreatePage} mustBeLogged='in'/>
                <Route path={CONST.PATHS.teams.id(null)} component={TeamPage}/>
                <Route path={CONST.PATHS.teams.base} component={TeamsPage}/>

                {/* Tournaments */}
                <AuthedRoute path={CONST.PATHS.tournaments.create} component={TournamentCreatePage} mustBeLogged='in'/>
                <Route path={CONST.PATHS.tournaments.list} component={TournamentsListPage}/>
                <Route path={CONST.PATHS.tournaments.meetings(null)} exact component={TournamentMeetingsListPage}/>
                <Route path='/tournaments/:tournamentId' component={TournamentsPage}/>

                {/* Meetings */}
                <Route path={CONST.PATHS.meetings.id(null)} component={MeetingPage}/>

                {/* Profile */}
                <Route exact path={CONST.PATHS.profile.settings.base}>
                    <Redirect to={CONST.PATHS.profile.settings.section(ProfileSettingsSections.Personal)}/>
                </Route>
                <AuthedRoute path={CONST.PATHS.profile.settings.section()} component={ProfilePage} mustBeLogged='in'/>
                <AuthedRoute path={CONST.PATHS.profile.section()} component={ProfilePage} mustBeLogged='in'/>
                <Route exact path={CONST.PATHS.profile.base}>
                    <Redirect to={CONST.PATHS.profile.section(ProfileSections.Teams)}/>
                </Route>

                {/* Auth */}
                <AuthedRoute path={CONST.PATHS.signup} component={SignUpPage} mustBeLogged='out'/>
                <AuthedRoute path={CONST.PATHS.login} component={LoginPage} mustBeLogged='out'/>

                {/* Test */}
                <Route path='/test-grid' component={TestGrid}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.querySelector(CONST.BASE_SELECTOR)
);
