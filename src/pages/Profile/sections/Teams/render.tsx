import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { Divider, Button, Space } from 'antd';

import CONST from 'Constants';
import { Team } from 'Utils/types';
import TeamModel from 'Models/TeamModel';
import TeamList from 'Components/Teams/List/render';


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
    }, [props.match.params['nickname']]);

    return (<>
        <Divider orientation={'left'}>
            <Space direction='horizontal' size='small' align='baseline'>
                <h4>Тренирую</h4>
                <Button type='link'>
                    <Link to={CONST.PATHS.teams.create}>Создать</Link>
                </Button>
            </Space>
        </Divider>
        <TeamList teams={teamsOwned} action={null} loading={loadingOwnTeams} {...props}/>

        <Divider orientation={'left'}>Играю</Divider>
        <TeamList teams={teamsPlayed} action={null} loading={loadingTeamsPlayed} {...props} />
    </>);
};

export default TeamsSubPage;
