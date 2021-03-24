import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import {Meeting, Stats, Team} from 'Utils/types';
import MeetingModel from 'Models/MeetingModel';
import MeetingPageRender from 'Pages/Meeting/render';


// interface IProps extends RouteComponentProps {}

interface IState {
    meeting?: Meeting,
    loadingMeeting: boolean
}

class MeetingPage extends React.Component<RouteComponentProps, IState> {
    constructor(props:RouteComponentProps) {
        super(props);
        this.state = {
            loadingMeeting: true,
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
                console.log(meeting);
                this.setState({
                    meeting: meeting as Meeting
                });
            })
            .catch(e => { console.error(e); })
            .finally(() => { this.setState(prev => ({ ...prev, loadingMeeting:false }) ); });
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
        for (const tid of values) {
            const res = await MeetingModel.addTeam(this.state.meeting.tournamentId, tid);
            console.log(res);
        }
        this.parseMeeting();
    }

    async changeStatus():Promise<void> {
        if (!confirm('Изменить статус встречи?')) return;
        return MeetingModel.changeStatus(this.state.meeting.id, this.state.meeting.status + 1)
            .then(() => { this.parseMeeting(); })
            .catch(e => { console.error(e); });
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
