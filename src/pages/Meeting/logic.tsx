import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Meeting } from 'Utils/types';
import MeetingModel from 'Models/MeetingModel';
import TournamentModel from 'Models/TournamentModel';
import MeetingPageRender from 'Pages/Meeting/render';


// interface IProps extends RouteComponentProps {}

interface IState {
    meeting: Meeting | null,
    loadingMeeting: boolean,
    leftTeam: Array<any>,
    rightTeam: Array<any>
}

class MeetingPage extends React.Component<RouteComponentProps, IState> {
    constructor(props:RouteComponentProps) {
        super(props);
        this.state = {
            meeting: null,
            loadingMeeting: true,
            leftTeam: [],
            rightTeam: [],
        };

        this.handlePointsSave = this.handlePointsSave.bind(this);
        this.saveMeeting = this.saveMeeting.bind(this);
        this.handleTeamsAdd = this.handleTeamsAdd.bind(this);
    }

    componentDidMount():void {
        this.parseMeeting();
    }

    parseMeeting():void {
        const leftTeam = [];
        const rightTeam = [];
        MeetingModel.getMeeting(this.props.match.params['id'])
            .then(meeting => {
                console.log(meeting);
                this.setState({
                    meeting: meeting as Meeting,
                    leftTeam: leftTeam,
                    rightTeam: rightTeam,
                });
            })
            .catch(e => { console.error(e); })
            .finally(() => { this.setState(prev => ({ ...prev, loadingMeeting:false }) ); });
    }

    // Handlers
    handlePointsSave(row):void {
        console.log(row);
    }

    handleTeamsAdd(values:Array<number>) {
        TournamentModel.addTeam(this.state.meeting.tournamentId, values[0])
            .then(() => { this.setState(prev => ({ ...prev, loadingMeeting:true }))})
            .then(() => { this.parseMeeting(); });
    }

    saveMeeting():void {
        console.log(this.state);
    }

    render(): JSX.Element {
        return (<MeetingPageRender {...this.props} {...this.state}
            handlePointsSave={this.handlePointsSave}
            handleTeamsAdd={this.handleTeamsAdd}
        />);
    }
}

export default MeetingPage;
