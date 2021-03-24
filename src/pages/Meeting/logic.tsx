import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import {Meeting, Team} from 'Utils/types';
import MeetingModel from 'Models/MeetingModel';
import TournamentModel from 'Models/TournamentModel';
import MeetingPageRender from 'Pages/Meeting/render';


// interface IProps extends RouteComponentProps {}

interface IState {
    meeting?: Meeting,
    loadingMeeting: boolean,
    leftTeam?: Team,
    rightTeam?: Team
}

class MeetingPage extends React.Component<RouteComponentProps, IState> {
    constructor(props:RouteComponentProps) {
        super(props);
        this.state = {
            loadingMeeting: true,
        };

        this.handlePointsSave = this.handlePointsSave.bind(this);
        this.saveMeeting = this.saveMeeting.bind(this);
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
                    meeting: meeting as Meeting,
                    leftTeam: null,
                    rightTeam: null,
                });
            })
            .catch(e => { console.error(e); })
            .finally(() => { this.setState(prev => ({ ...prev, loadingMeeting:false }) ); });
    }

    // Handlers
    handlePointsSave(row):void {
        console.log(row);
    }

    handleTeamsAdd(values:Array<number>):void {
        TournamentModel.addTeam(this.state.meeting.tournamentId, values[0])
            .then(() => { this.parseMeeting(); });
    }

    async changeStatus():Promise<void> {
        if (!confirm('Изменить статус встречи?')) return;
        return MeetingModel.changeStatus(this.state.meeting.id, this.state.meeting.status + 1)
            .then(() => { this.parseMeeting(); })
            .catch(e => { console.error(e); });
    }

    saveMeeting():void {
        console.log(this.state);
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
