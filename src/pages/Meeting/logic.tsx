import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { message } from 'antd';

import UserModel from 'Models/UserModel';
import { Meeting, Stats, Tournament, User } from 'Utils/types';
import HttpStatusCode from 'Utils/httpErrors';
import MeetingModel from 'Models/MeetingModel';
import TournamentModel from 'Models/TournamentModel';
import { UserType } from 'Store/User/UserState';
import MeetingPageRender from 'Pages/Meeting/render';
import { URL_PARAMS } from 'Constants';

interface IProps extends RouteComponentProps {
    user: UserType
}

interface IState {
    meeting?: Meeting,
    stats?: Array<Stats>,
    canEdit: boolean,
    loadingMeeting: boolean,
    tournament?: Tournament,
}

class MeetingPage extends React.Component<IProps, IState> {
    state:IState = {
        loadingMeeting: true,
        canEdit: false,
    };

    componentDidMount():void {
        this.parseMeeting();
    }

    checkRights():void {
        if (!this.state.meeting) return;
        Promise.all([
            this.props.user ? Promise.resolve(this.props.user) : UserModel.getProfile(),
            TournamentModel.getTournament(this.state.meeting.tournamentId),
        ]).then(results => {
            const user = results[0] as User;
            const tournament = results[1] as Tournament;
            this.setState(prev => ({
                ...prev,
                canEdit: user?.id === tournament.ownerId,
                tournament: tournament,
            }));
        });
    }

    parseMeeting():void {
        this.setState(prev => ({ ...prev, loadingMeets:true }) );
        MeetingModel.getMeeting(this.props.match.params[URL_PARAMS.meeting.id])
            .then((meeting:Meeting) => {
                this.setState(prev => ({
                    ...prev,
                    meeting: meeting,
                }), () => { this.checkRights(); });
            })
            .catch(e => console.error(e))
            .finally(() => {
                this.setState(prev => ({ ...prev, loadingMeeting:false }) );
            });
        MeetingModel.getStats(this.props.match.params[URL_PARAMS.meeting.id])
            .then(stats => { this.setState(prev => ({ ...prev, stats:stats as Array<Stats> })); })
            .catch(e => { if (e !== 404) message.error(e); });
    }

    // Handlers
    handlePointsSave():void {
        this.parseMeeting();
    }

    async handleTeamsAdd(values:Array<number>):Promise<void> {
        Promise.all(values.map(tid => MeetingModel.addTeam(this.state.meeting.id, tid)))
            .then(() => { this.parseMeeting(); });
    }

    async changeStatus():Promise<HttpStatusCode | Meeting> {
        if (!confirm('Изменить статус встречи?')) return;
        await MeetingModel.changeStatus(this.state.meeting.id, this.state.meeting.status + 1)
            .then(() => { this.parseMeeting(); })
            .catch(e => {
                const error = e as HttpStatusCode;
                let errorText = 'Ошибка';
                switch (error) {
                case HttpStatusCode.FORBIDDEN: errorText = 'У вас нет прав'; break;
                }
                message.error(errorText);
            });
    }

    render(): JSX.Element {
        return (<MeetingPageRender {...this.props} {...this.state}
            reload={this.parseMeeting}
            handlePointsSave={this.handlePointsSave}
            handleTeamsAdd={this.handleTeamsAdd}
            changeStatus={this.changeStatus}
        />);
    }
}

const mapStateToProps = state => ({
    user: state.user.user
});

export default connect(mapStateToProps)(MeetingPage);
