import * as React from 'react';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Spin, Typography, Space, Button } from 'antd';
const { Title, Text } = Typography;

import CONST from 'Constants';
import TournamentModel from 'Models/TournamentModel';
import {UserAuthenticatedType} from 'Store/User/UserState';
import {User} from 'Utils/types';


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
            TournamentModel.getTournaments(props.user.id).then(teams => {
                setTournamentsOwned(teams);
                setLoadingOwnTournaments(false);
            });
        }
        load();
    }, []);

    return (<>
        <Space direction='vertical'>
            <Space size='large' align='baseline'>
                <Title level={3}>Мои турниры</Title>
                <Button type='link' href={CONST.PATHS.tournaments.create}>Создать</Button>
            </Space>
            {loadingOwnTournaments
                ? <Spin/>
                : tournamentsOwned.length > 0
                    ? <>{tournamentsOwned.map((t, index) => <p key={index}>{t}</p>)}</>
                    : <Text type='secondary'>Нет турниров</Text>
            }
        </Space>
    </>);
};

export default TournamentsProfileSection;
