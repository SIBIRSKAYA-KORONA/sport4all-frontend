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
    const playerStats: Array<Stats> = props.stats && props.team.players &&
        props.stats.filter(stata => stata.teamId === props.team.id && props.team.players.find(player => player.id === stata.playerId));
    return (
        <Space direction='vertical' size='middle' align='center'>
            <Avatar size={100} src={props.team.avatar.url}>{lettersForAvatar(props.team.name)}</Avatar>
            <Title level={5} className='meeting__title'>{props.team.name}</Title>
            {playerStats && <MeetingScoredPlayers stats={playerStats} team={props.team} />}
        </Space>
    );
}

export default MeetingTeamScore;
