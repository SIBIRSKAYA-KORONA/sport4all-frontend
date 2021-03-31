import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { Spin, Typography, Space, Button, Table, Empty } from 'antd';
const { Title } = Typography;

import CONST from 'Constants';
import { User } from 'Utils/types';
import TournamentModel from 'Models/TournamentModel';
import { UserAuthenticatedType } from 'Store/User/UserState';
import MeetingStatusTag from 'Components/Meeting/StatusTag/render';


const initTeams: [any?] = [];

interface IProps extends RouteComponentProps {
    user: User,
    isAuthenticated: UserAuthenticatedType
}

const TournamentsProfileSection = (props:IProps):JSX.Element => {
    const [loadingOwnTournaments, setLoadingOwnTournaments] = useState(true);
    const [tournamentsOwned, setTournamentsOwned] = useState(initTeams);

    useEffect(() => {
        const load = () => {
            TournamentModel.getTournaments(props.user.id).then(tours => {
                setTournamentsOwned(tours.owner);
                setLoadingOwnTournaments(false);
            });
        }
        load();
    }, []);

    const columns = [
        { title: 'Название', dataIndex: 'name', key:'name' },
        {
            title: 'Статус',
            key: 'status',
            render: function StatusCell(text, tour) {
                return (<MeetingStatusTag status={tour.status}/>)
            }
        }
    ];
    const dataSource = tournamentsOwned // TODO: fix duplicates on the backend
        .filter(t => t.ownerId === props.user.id)
        .filter((t, index) => tournamentsOwned.findIndex(tt => t.id === tt.id) === index)
        .sort((a, b) => a.status - b.status)
        .map(t => ({ ...t, key:t.id }));

    return (<>
        <Space direction='vertical'>
            <Space size='large' align='baseline'>
                <Title level={3}>Мои турниры</Title>
                <Button type='link'>
                    <Link to={CONST.PATHS.tournaments.create}>Создать</Link>
                </Button>
            </Space>
            {loadingOwnTournaments
                ? <Spin/>
                : tournamentsOwned.length > 0
                    ? <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        rowClassName={() => 'row'}
                        onRow={tour => ({
                            onClick: () => { props.history.push(CONST.PATHS.tournaments.id(tour.id)); }
                        })}/>
                    : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        </Space>
    </>);
};

export default TournamentsProfileSection;
