import './style.scss';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Avatar } from 'antd';

import { PATHS } from 'Constants';
import { Team } from 'Utils/types';
import { lettersForAvatar } from 'Utils/utils';


interface IProps extends RouteComponentProps {
    team: Team,
}

function MeetingTeamScore(props: IProps): JSX.Element {
    return (
        <div className='meeting__header_team'>
            <div onClick={() => { props.history.push(PATHS.teams.id(props.team.id)) }}>
                <Avatar className='meeting__header_team_img' src={props.team.avatar?.url} alt={props.team.avatar?.filename}>{lettersForAvatar(props.team.name)}</Avatar>
            </div>
            <p>{props.team.name}</p>
        </div>
    );
}

export default MeetingTeamScore;
