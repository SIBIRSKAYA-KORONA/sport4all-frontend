import './style.scss';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';

import { PATHS } from 'Constants';
import { Stats, Team } from 'Utils/types';
import { lettersForAvatar } from 'Utils/utils';
import { lettersForUserAvatar } from 'Utils/structUtils';


interface IProps {
    team: Team,
    stats: Stats[],
}

function TeamScores(props: IProps): JSX.Element {
    return (
        <div className='team-scores'>
            <div className='team-scores__team'>
                <Link to={PATHS.teams.id(props.team.id)}><Avatar src={props.team.avatar} className='team-scores__team_img'>{lettersForAvatar(props.team.name)}</Avatar></Link>
                <Link to={PATHS.teams.id(props.team.id)} className='team-scores__team_title'>{props.team.name}</Link>
            </div>
            <table className='team-scores__table'>
                <thead>
                    <tr>
                        <th>Спортсмен</th>
                        <th>Очки</th>
                    </tr>
                </thead>
                <tbody>
                    {props.stats.map(s => {
                        const player = props.team.players?.find(p => p.id === s.playerId);
                        if (!player) return;
                        return (<tr key={s.id}>
                            <td className='team-scores__player'>
                                <Link to={PATHS.profile.nickname(player.nickname)}><Avatar className='team-scores__player_img' src={player.avatar.url}>{lettersForUserAvatar(player)}</Avatar></Link>
                                <Link to={PATHS.profile.nickname(player.nickname)} className='team-scores__player_name'>{player.name} {player.surname}</Link>
                            </td>
                            <td>{s.score}</td>
                        </tr>);
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TeamScores;
