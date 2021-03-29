import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { message } from 'antd';

import { Meeting, Stats } from 'Utils/types';
import MeetingModel from 'Models/MeetingModel';
import MeetingPageRender from 'Pages/Meeting/render';
import HttpStatusCode from 'Utils/httpErrors';


// interface IProps extends RouteComponentProps {}

interface IState {
    meeting?: Meeting,
    stats?: Array<Stats>,
    canEdit: boolean,
    loadingMeeting: boolean,
}

class MeetingPage extends React.Component<RouteComponentProps, IState> {
    constructor(props:RouteComponentProps) {
        super(props);
        this.state = {
            loadingMeeting: true,
            canEdit: true, // get ownerId of tournament and check rights
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
        MeetingModel.getMeeting(this.props.match.params['id'])
            .then(meeting => {
                const castedMeeting: Meeting = meeting as Meeting;
                this.setState({
                    meeting: castedMeeting
                });
                console.log(meeting);
            })
            .catch(e => { console.error(e); })
            .finally(() => { this.setState(prev => ({ ...prev, loadingMeeting:false }) ); });
        MeetingModel.getStats(this.props.match.params['id'])
            .then(stats => { this.setState(prev => ({ ...prev, stats:stats as Array<Stats> })); })
            .catch(e => {
                if (e !== 404) console.error(e);
            });
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

export default MeetingPage;
