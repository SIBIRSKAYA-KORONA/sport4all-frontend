import * as React from 'react';

import { Space, Avatar, Typography } from 'antd';
const { Title } = Typography;

import { lettersForAvatar } from 'Utils/utils';
import { Stats, Team } from 'Utils/types';
import MeetingScoredPlayers from 'Pages/Meeting/Components/ScoredPlayers';


interface IProps {
    team: Team,
    stats: Array<Stats> | null
}

function MeetingTeamScore(props: IProps): JSX.Element {
    const ourStats: Array<Stats> = props.stats && props.stats.filter(stata => stata.teamId === props.team.id);
    return (
        <Space direction='vertical' size='middle' align='center'>
            <Avatar size={100}>{lettersForAvatar(props.team.name)}</Avatar>
            <Title level={5} className='meeting__title'>{props.team.name}</Title>
            {ourStats && <MeetingScoredPlayers stats={ourStats} team={props.team} />}
        </Space>
    );
}

export default MeetingTeamScore;
