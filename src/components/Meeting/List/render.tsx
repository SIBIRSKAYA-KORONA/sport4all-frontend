import * as React from 'react';
import { Link } from 'react-router-dom';

import { Space, Table } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

import CONST from 'Constants';
import { Meeting } from 'Utils/types';
import MeetingStatusTag from 'Components/Meeting/StatusTag/render';
import { meetingResult } from 'Utils/structUtils';


interface IProps {
    meetings: Array<Meeting>
}

function MeetingsList(props: IProps): JSX.Element {
    const columns = [
        { title: 'Участники', dataIndex: 'teams', key: 'teams' },
        {
            title: 'Статус',
            key: 'status',
            render: function StatusCell(text, team) {
                return (<MeetingStatusTag status={team.status}/>)
            }
        },
        { title: 'Результат', dataIndex: 'result', key: 'result' },
        {
            title: 'Страница',
            key: 'link',
            render: function LinkCell(text, team) {
                return (
                    <Space size='small'>
                        <Link to={CONST.PATHS.meetings.id(team.id)}><GlobalOutlined /></Link>
                    </Space>
                )
            },
        },
    ];
    const data = props.meetings.map(m => {
        return {
            ...m,
            teams: m.teams && m.teams.length ? m.teams.join('\n') : 'Не назначены',
            result: meetingResult(m.stats, m.teams),
        };
    });

    return (
        <Table dataSource={data} columns={columns}/>
    );
}

export default MeetingsList;
