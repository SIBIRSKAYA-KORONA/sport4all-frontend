import * as React from 'react';

import { Table } from 'antd';

import { PATHS } from 'Constants';
import { Meeting } from 'Utils/types';
import { meetingResult } from 'Utils/structUtils';
import { RouteComponentProps } from 'react-router-dom';
import MeetingStatusTag from 'Components/Meeting/StatusTag/render';


interface IProps extends RouteComponentProps {
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
    ];
    const data = props.meetings.map(m => {
        return {
            ...m,
            teams: m.teams && m.teams.length ? m.teams.join('\n') : 'Не назначены',
            result: meetingResult(m.stats, m.teams),
        };
    });

    return (
        <Table
            dataSource={data}
            columns={columns}
            rowClassName={() => 'row'}
            onRow={meeting => ({
                onClick: () => { props.history.push(PATHS.meetings.id(meeting.id)); }
            })}/>
    );
}

export default MeetingsList;
