import * as React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

import { Space, Table } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { Team } from 'Utils/types';


interface IProps extends RouteComponentProps {
    teams: [Team?]
}

const TeamList = (props:IProps):JSX.Element => {
    const dataSource = props.teams.map(team => ({ ...team, key: team.id }));
    const columns = [
        { title: 'Название', dataIndex: 'name', key: 'name' },
        { title: 'Описание', dataIndex: 'about', key: 'about' },
        { title: 'Место', dataIndex: 'location', key: 'location' },
        { title: 'Владелец', dataIndex: 'ownerId', key: 'ownerId' },
        {
            title: 'Ссылка',
            key: 'link',
            render: function LinkCell(text, team) {
                return (
                    <Space size='small'>
                        <Link to={'/teams/'+team.id}>Страница</Link>
                    </Space>
                )
            },
        },
    ];
    return (
        <Table dataSource={dataSource} columns={columns} pagination={false} />
    );
}

export default TeamList;
