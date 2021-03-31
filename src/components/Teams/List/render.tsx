import './style.scss';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Avatar, List } from 'antd';

import CONST from 'Constants';
import { Team } from 'Utils/types';
import { lettersForAvatar } from 'Utils/utils';


interface IProps extends RouteComponentProps {
    teams: [Team?]
}

const TeamList = (props:IProps):JSX.Element => {
    return (
        <List
            style={{
                marginLeft: 10,
            }}
            itemLayout="horizontal"
            dataSource={props.teams}
            renderItem={team => (
                <List.Item
                    style={{
                        paddingLeft: 10,
                    }}
                    className={'row'}
                    onClick={() => { props.history.push(CONST.PATHS.teams.id(team.id)) }}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={team.avatar.url}>{lettersForAvatar(team.name)}</Avatar>}
                        title={team.name}
                        description={team.about}
                    />
                </List.Item>
            )}
        />
    );
}

export default TeamList;
