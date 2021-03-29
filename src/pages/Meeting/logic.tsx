import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { message } from 'antd';

import UserModel from 'Models/UserModel';
import { Meeting, Stats, User } from 'Utils/types';
import HttpStatusCode from 'Utils/httpErrors';
import MeetingModel from 'Models/MeetingModel';
import { UserType } from 'Store/User/UserState';
import MeetingPageRender from 'Pages/Meeting/render';

interface IProps extends RouteComponentProps {
    user: UserType
}

interface IState {
    meeting?: Meeting,
    stats?: Array<Stats>,
    canEdit: boolean,
    loadingMeeting: boolean,
}

class MeetingPage extends React.Component<IProps, IState> {
    constructor(props:IProps) {
        super(props);
        this.state = {
            loadingMeeting: true,
            canEdit: false,
        };

        this.handlePointsSave = this.handlePointsSave.bind(this);
        this.handleTeamsAdd = this.handleTeamsAdd.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
    }

    componentDidMount():void {
        this.parseMeeting();
    }

    parseMeeting():void {
        this.setState(prev => ({ ...prev, loadingMeets:true }) );
        Promise.all([
            MeetingModel.getMeeting(this.props.match.params['id']),
            this.props.user ? Promise.resolve(this.props.user) : UserModel.getProfile()
        ]).then(results => {
            const castedMeeting = results[0] as Meeting;
            const user = results[1] as User; // TODO: check tournament.ownerId === user.id
            this.setState(prev => ({
                ...prev,
                meeting: castedMeeting,
                canEdit: true
            }));
        }).catch(e => {
            console.error(e);
        }).finally(() => { this.setState(prev => ({ ...prev, loadingMeeting:false }) ); });
        MeetingModel.getStats(this.props.match.params['id'])
            .then(stats => { this.setState(prev => ({ ...prev, stats:stats as Array<Stats> })); })
            .catch(e => { if (e !== 404) message.error(e); });
    }

    // Handlers
    handlePointsSave(values: { id:number }):void {
        for (const key in values) if (Object.prototype.hasOwnProperty.call(values, key)) {
            const stats = {
                score: +values[key],
                meetingId: this.state.meeting.id,
                teamId: +key,
            };
            MeetingModel.addTeamResults(stats);
        }
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
