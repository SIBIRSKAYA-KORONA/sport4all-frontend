import './style.scss';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Table } from 'antd';

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
    ];
    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            rowClassName={() => 'row'}
            onRow={team => ({
                onClick: () => { props.history.push('/teams/'+team.id); }
            })}
        />
    );
}

export default TeamList;
