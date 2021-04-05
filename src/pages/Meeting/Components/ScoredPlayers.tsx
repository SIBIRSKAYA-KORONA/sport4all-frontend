import * as React from 'react';

import { Space, Typography } from 'antd';
const { Text } = Typography;

import { Stats, Team } from 'Utils/types';


interface IProps {
    stats: Array<Stats>,
    team: Team
}

interface ScoredPlayers {
    playerName: string,
    score: number
}

function MeetingScoredPlayers(props: IProps): JSX.Element {
    const scoredPlayers:Array<ScoredPlayers> = props.stats
        .map(stata => ({
            playerName: props.team.players.find(player => player.id === stata.playerId).nickname,
            score: stata.score
        }));

    return (<Space direction='vertical' size='small'>
        {scoredPlayers.map(player => <Text key={player.playerName} type='secondary' strong>{player.playerName} - {player.score}</Text>)}
    </Space>);
}

export default MeetingScoredPlayers;
