import './style.scss';
import * as React from 'react';
import { Avatar } from 'antd';

import { Stats, Team, User } from 'Utils/types';
import { lettersForAvatar } from 'Utils/utils';
import { lettersForUserAvatar } from 'Utils/structUtils';


interface IProps {
    team: Team,
    stats: Stats[],
    onChange: (value:number, player:User, team:Team) => void,
}

function MeetingModalAddScoresTable(props: IProps): JSX.Element {
    return (
        <div className='meeting__modal_table'>
            <div className='meeting__modal_table_team'>
                <Avatar src={props.team.avatar.url} className='meeting__modal_table_team_img'>{lettersForAvatar(props.team.name)}</Avatar>
                <span className='meeting__modal_table_team_title'>{props.team.name}</span>
            </div>
            <table className='meeting__modal_table_table'>
                <thead>
                    <tr>
                        <th>Спортсмен</th>
                        <th>Очки</th>
                    </tr>
                </thead>
                <tbody>
                    {props.team.players?.map(p => (
                        <tr key={p.id}>
                            <td className='meeting__modal_table__player'>
                                <Avatar className='meeting__modal_table__player_img' src={p.avatar.url}>{lettersForUserAvatar(p)}</Avatar>
                                <span className='meeting__modal_table__player_name'>{p.name} {p.surname}</span>
                            </td>
                            <td>
                                <input
                                    className='meeting__modal_table__input'
                                    type='number'
                                    value={(props.stats.find(s => s.playerId === p.id && s.teamId === props.team.id)?.score || 0).toString()}
                                    onChange={e => props.onChange(+e.target.value, p, props.team)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MeetingModalAddScoresTable;
