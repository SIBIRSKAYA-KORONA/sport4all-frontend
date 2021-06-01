import './main.scss';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import isMobile from 'is-mobile';

import store from 'Store/store';
import UserModel from 'Models/UserModel';
import FeedPage from 'Pages/Feed/render';
import LandingPage from 'Pages/Landing/render';
import LoginPage from 'Pages/Login/render';
import AuthedRoute from 'Utils/AuthedRoute';
import SignUpPage from 'Pages/SignUp/render';
import TestGrid from 'Pages/TestGrid/render';
import TeamPage from 'Pages/Teams/Team/render';
import MeetingPage from 'Pages/Meeting/logic';
import ProfilePage from 'Pages/Profile/render';
import TeamCreatePage from 'Pages/Teams/Create/render';
import NotificationsModel from 'Models/NotificationsModel';
import { CONST, PATHS, URL_PARAMS } from 'Utils/constants';
import TournamentsListPage from 'Pages/Tournaments/List/render';
import TournamentPage from 'Pages/Tournaments/Tournament/logic';
import TournamentCreatePage from 'Pages/Tournaments/Create/logic';
import TournamentMeetingsListPage from 'Pages/Tournaments/MeetingsList/render';
import { ProfileSections, ProfilePersonalSections, TeamSettingsSections, TournamentSettingsSection } from 'Utils/enums';
import MobilePlaceholder from 'Pages/MobilePlaceholder/render';

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
                { isMobile() && <Route path='*' component={MobilePlaceholder}/> }

                <Route exact path={PATHS.root} component={LandingPage}/>
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
                <AuthedRoute exact path={PATHS.tournaments.create} component={TournamentCreatePage} mustBeLogged='in'/>
                <Route exact path={PATHS.tournaments.id__config} render={props => (
                    <Redirect to={PATHS.tournaments.id(props.match.params[URL_PARAMS.tournament.id])}/>
                )}/>
                <Route exact path={PATHS.tournaments.settings.config} render={props => (
                    <Redirect to={PATHS.tournaments.settings.section(+props.match.params[URL_PARAMS.tournament.id], TournamentSettingsSection.Info)}/>
                )}/>
                <Route exact path={PATHS.tournaments.__config} component={TournamentPage}/>
                <Route exact path={PATHS.tournaments.meetings__config} component={TournamentMeetingsListPage}/>
                <Route exact path={PATHS.tournaments.list} component={TournamentsListPage}/>

                {/* Meetings */}
                <Route path={PATHS.meetings.id__config} component={MeetingPage}/>

                {/* Profile */}
                <Route exact path={PATHS.profile.personal.base} render={props => (
                    <Redirect exact to={PATHS.profile.personal.section(props.match.params[URL_PARAMS.profile.nickname], ProfilePersonalSections.Information)}/>
                )}/>
                <Route exact path={PATHS.profile.id__config} render={props => (
                    <Redirect exact to={PATHS.profile.section(props.match.params[URL_PARAMS.profile.nickname], ProfileSections.Tournaments)}/>
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
