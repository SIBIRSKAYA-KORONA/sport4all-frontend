import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { Spin, Typography, Space, Button } from 'antd';
const { Title, Text } = Typography;

import CONST from 'Constants';
import { User } from 'Utils/types';
import TournamentModel from 'Models/TournamentModel';
import { UserAuthenticatedType } from 'Store/User/UserState';


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
                    ? <>{tournamentsOwned.map(tour => <Link key={tour.id} to={CONST.PATHS.tournaments.id(tour.id)}>{tour.name}</Link>)}</>
                    : <Text type='secondary'>Нет турниров</Text>
            }
        </Space>
    </>);
};

export default TournamentsProfileSection;
