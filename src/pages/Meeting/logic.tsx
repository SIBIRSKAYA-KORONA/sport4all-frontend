import * as React from 'react';
import {connect} from 'react-redux';
import MeetingPageRender from 'Pages/Meeting/render';
import {RouteComponentProps} from 'react-router-dom';

// interface IProps extends RouteComponentProps {}

interface IState {
    meeting: any | null,
    leftTeam: Array<any>,
    rightTeam: Array<any>
}

class MeetingPage extends React.Component<RouteComponentProps, IState> {
    constructor(props:RouteComponentProps) {
        super(props);
        this.state = {
            meeting: null,
            leftTeam: [],
            rightTeam: [],
        };

        this.handlePointsSave = this.handlePointsSave.bind(this);
        this.saveMeeting = this.saveMeeting.bind(this);
    }

    componentDidMount():void {
        this.parseMeeting();
    }

    parseMeeting():void {
        const leftTeam = [];
        const rightTeam = [];
        this.setState({
            meeting: {},
            leftTeam: leftTeam,
            rightTeam: rightTeam,
        });
    };

    handlePointsSave(row):void {
        console.log(row);
    };

    saveMeeting():void {
        console.log(this.state);
    };

    render(): JSX.Element {
        return (<MeetingPageRender {...this.props} {...this.state}
            handlePointsSave={this.handlePointsSave}
        />);
    }
}

export default MeetingPage;
