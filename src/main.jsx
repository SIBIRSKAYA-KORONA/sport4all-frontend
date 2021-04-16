import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './main.scss';

import store from 'Store/store';
import FeedPage from 'Pages/Feed/render';
import HomePage from 'Pages/Home/render';
import SignUpPage from 'Pages/SignUp/render';
import TestGrid from 'Pages/TestGrid/render';
import { CONST, PATHS, URL_PARAMS } from 'Utils/constants';
import TeamCreatePage from 'Pages/Teams/Create/render';
import TeamPage from 'Pages/Teams/Team/logic';
import TournamentCreatePage from 'Pages/Tournaments/Create/logic';
import TournamentsPage from 'Pages/Tournaments/Tournament/logic';
import TournamentsListPage from 'Pages/Tournaments/List/render';
import LoginPage from 'Pages/Login/render';
import ProfilePage from 'Pages/Profile/render';
import AuthedRoute from 'Utils/AuthedRoute';
import MeetingPage from 'Pages/Meeting/logic';
import TournamentMeetingsListPage from 'Pages/Tournaments/MeetingsList/render';
import {ProfileSections, ProfilePersonalSections, TeamSettingsSections} from 'Utils/enums';
import UserModel from 'Models/UserModel';
import NotificationsModel from 'Models/NotificationsModel'


// PREPARE APP
// TODO: refactor this
let lastIsAuthenticated = store.getState().user.isAuthenticated;
store.subscribe(() => {
    const state = store.getState();
    const isAuthenticated = state.user.isAuthenticated;
    if (lastIsAuthenticated !== state.user.isAuthenticated) {
        if (isAuthenticated) {
            console.log('opening socket')
            NotificationsModel.openWebSocket();
            NotificationsModel.getNotifications().catch(() => {
                console.log('Could not get notifications. User probably is not authenticated');
            });
        } else {
            console.log('closing socket')
            NotificationsModel.closeWebSocket();
        }
    }

    lastIsAuthenticated = isAuthenticated;
});


UserModel.getProfile().catch(() => {
    console.log('Could not get profile. User probably is not authenticated');
});




render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route exact path={PATHS.feed} component={FeedPage}/>

                {/* Teams */}
                <AuthedRoute exact path={PATHS.teams.create} component={TeamCreatePage} mustBeLogged='in'/>
                <Route exact path={PATHS.teams.id__config} render={props => (
                    <Redirect to={PATHS.teams.id(+props.match.params[URL_PARAMS.team.id])} />
                )}/>
                <Route exact path={PATHS.teams.settings.config} render={props => (
                    <Redirect to={PATHS.teams.settings.section(+props.match.params[URL_PARAMS.team.id], TeamSettingsSections.Info)} />
                )}/>
                <Route exact path={PATHS.teams.__config} component={TeamPage}/>

                {/* Tournaments */}
                <AuthedRoute path={PATHS.tournaments.create} component={TournamentCreatePage} mustBeLogged='in'/>
                <Route path={PATHS.tournaments.list} component={TournamentsListPage}/>
                <Route path={PATHS.tournaments.meetings(null)} exact component={TournamentMeetingsListPage}/>
                <Route path='/tournaments/:tournamentId' component={TournamentsPage}/>

                {/* Meetings */}
                <Route path={PATHS.meetings.id(null)} component={MeetingPage}/>

                {/* Profile */}
                <Route exact path={PATHS.profile.personal.base} render={props => (
                    <Redirect exact to={PATHS.profile.personal.section(props.match.params['nickname'], ProfilePersonalSections.Information)}/>
                )}/>
                <Route exact path={PATHS.profile.id__config} render={props => (
                    <Redirect exact to={PATHS.profile.section(props.match.params['nickname'], ProfileSections.Tournaments)}/>
                )}/>
                <AuthedRoute exact path={PATHS.profile.__config} component={ProfilePage} mustBeLogged='in'/>

                {/* Auth */}
                <AuthedRoute path={PATHS.signup} component={SignUpPage} mustBeLogged='out'/>
                <AuthedRoute path={PATHS.login} component={LoginPage} mustBeLogged='out'/>

                {/* Test */}
                <Route path='/test-grid' component={TestGrid}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.querySelector(CONST.BASE_SELECTOR)
);
