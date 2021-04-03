import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './main.scss';

import store from 'Store/store';
import FeedPage from 'Pages/Feed/render';
import HomePage from 'Pages/Home/render';
import SignUpPage from 'Pages/SignUp/logic';
import TestGrid from 'Pages/TestGrid/render';
import CONST from 'Utils/constants';
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
import {ProfileSections, ProfileSettingsSections} from 'Utils/enums';
import Network from './core/network';
import UserModel from 'Models/UserModel';

Network.initWebSocket();
try {
    UserModel.getProfile();
} catch (e) {
    console.error(e);
}

render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route exact path={CONST.PATHS.feed} component={FeedPage}/>

                {/* Teams */}
                <AuthedRoute exact path={CONST.PATHS.teams.create} component={TeamCreatePage} mustBeLogged='in'/>
                <Route exact path={CONST.PATHS.teams.id_config} render={props => (
                    <Redirect to={CONST.PATHS.teams.id(+props.match.params['id'])} />
                )}/>
                <Route path={CONST.PATHS.teams.__config} component={TeamPage}/>

                {/* Tournaments */}
                <AuthedRoute path={CONST.PATHS.tournaments.create} component={TournamentCreatePage} mustBeLogged='in'/>
                <Route path={CONST.PATHS.tournaments.list} component={TournamentsListPage}/>
                <Route path={CONST.PATHS.tournaments.meetings(null)} exact component={TournamentMeetingsListPage}/>
                <Route path='/tournaments/:tournamentId' component={TournamentsPage}/>

                {/* Meetings */}
                <Route path={CONST.PATHS.meetings.id(null)} component={MeetingPage}/>

                {/* Profile */}
                <Route exact path={CONST.PATHS.profile.settings.base} render={props => (
                    <Redirect exact to={CONST.PATHS.profile.settings.section(props.match.params['nickname'], ProfileSettingsSections.Personal)}/>
                )}/>
                <Route exact path={CONST.PATHS.profile.id__config} render={props => (
                    <Redirect exact to={CONST.PATHS.profile.section(props.match.params['nickname'], ProfileSections.Tournaments)}/>
                )}/>
                <AuthedRoute exact path={CONST.PATHS.profile.__config} component={ProfilePage} mustBeLogged='in'/>

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
