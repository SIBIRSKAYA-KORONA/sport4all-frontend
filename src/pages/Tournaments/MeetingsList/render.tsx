import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Typography } from 'antd';
const { Title } = Typography;

import { Meeting } from 'Utils/types';
import BasePage from 'Components/BasePage/render';
import TournamentModel from 'Models/TournamentModel';
import MeetingsList from 'Components/Meeting/List/render';


function TournamentMeetingsListPage(props:RouteComponentProps): JSX.Element {
    const [loading, setLoading] = React.useState(true);
    const [meetings, setMeetings] = React.useState<Array<Meeting>>([]);

    React.useEffect(() => {
        const load = () => {
            TournamentModel.getMeetings(props.match.params['tournamentId'])
                .then(meetings => setMeetings(meetings))
                .finally(() => setLoading(false));
        };
        load();
    }, [])

    return (
        <BasePage {...props} loading={loading}>
            <Title level={1}>Матчи турнира</Title>
            <MeetingsList meetings={meetings}/>
        </BasePage>
    )
}

export default TournamentMeetingsListPage;
