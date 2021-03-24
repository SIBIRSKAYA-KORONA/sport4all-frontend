import * as React from 'react';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Spin, Typography, Space, Button } from 'antd';
const { Title, Text } = Typography;

import CONST from 'Constants';
import TournamentModel from 'Models/TournamentModel';


const initTeams: [any?] = [];

const TournamentsProfileSection = (props:RouteComponentProps):JSX.Element => {
    const [loadingOwnTournaments, setLoadingOwnTournaments] = useState(true);
    const [tournamentsOwned, setTournamentsOwned] = useState(initTeams);

    useEffect(() => {
        const load = () => {
            TournamentModel.loadTournaments('owner').then(teams => {
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
