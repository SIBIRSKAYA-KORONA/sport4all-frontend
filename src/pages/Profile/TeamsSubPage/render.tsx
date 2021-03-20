import * as React from 'react';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Divider, Spin, Typography, Space, Button } from 'antd';

import TeamModel from 'Models/TeamModel';
import { Team } from 'Utils/types';
import TeamList from 'Components/Teams/List/render';
import CONST from 'Constants';
const { Title, Text } = Typography;


const initTeams: [Team?] = [];

const TeamsSubPage = (props:RouteComponentProps):JSX.Element => {
    const [loadingOwnTeams, setLoadingOwnTeams] = useState(true);
    const [teamsOwned, setTeamsOwned] = useState(initTeams);

    const [loadingTeamsPlayed, setLoadingTeamsPlayed] = useState(true);
    const [teamsPlayed, setTeamsPlayer] = useState(initTeams);

    useEffect(() => {
        const load = () => {
            TeamModel.instance.loadTeams('owner').then(teams => {
                setTeamsOwned(teams);
                setLoadingOwnTeams(false);
            });
            TeamModel.instance.loadTeams('player').then(teams => {
                setTeamsPlayer(teams);
                setLoadingTeamsPlayed(false);
            });
        }
        load();
    }, []);

    return (<>
        <Space direction='vertical'>
            <Space size='large'>
                <Title level={3}>Тренирую</Title>
                <Button type='link' href={CONST.PATHS.teams.create}>Создать</Button>
            </Space>
            {loadingOwnTeams
                ? <Spin/>
                : teamsOwned.length > 0
                    ? <TeamList teams={teamsOwned} {...props}/>
                    : <Text type='secondary'>Нет команд</Text>
            }
        </Space>

        <Divider/>

        <Space direction='vertical'>
            <Space size='large'>
                <Title level={3}>Играю</Title>
                {/*<Button type='link'>Вступить</Button>*/}
            </Space>
            {loadingTeamsPlayed
                ? <Spin/>
                : teamsPlayed.length > 0
                    ? <TeamList teams={teamsPlayed} {...props} />
                    : <Text type='secondary'>Нет команд</Text>
            }
        </Space>
    </>);
};

export default TeamsSubPage;
