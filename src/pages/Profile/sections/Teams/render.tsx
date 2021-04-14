import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { Divider, Button, Space } from 'antd';

import CONST from 'Constants';
import { Team, User } from 'Utils/types';
import TeamModel from 'Models/TeamModel';
import TeamList from 'Components/Teams/List/render';
import FindTeamModal from 'Pages/Profile/sections/Teams/FindTeamModal';


const initTeams: [Team?] = [];

interface IProps extends RouteComponentProps {
    user: User
}

const TeamsSubPage = (props:IProps):JSX.Element => {
    const [loadingOwnTeams, setLoadingOwnTeams] = useState(true);
    const [teamsOwned, setTeamsOwned] = useState(initTeams);

    const [loadingTeamsPlayed, setLoadingTeamsPlayed] = useState(true);
    const [teamsPlayed, setTeamsPlayer] = useState(initTeams);

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const load = () => {
            TeamModel.loadTeams('owner').then(teams => {
                setTeamsOwned(teams);
                setLoadingOwnTeams(false);
            });
            TeamModel.loadTeams('player').then(teams => {
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
        <TeamList teams={teamsOwned} actions={null} loading={loadingOwnTeams} {...props}/>

        <Divider orientation={'left'}>
            <Space direction='horizontal' size='small' align='baseline'>
                <h4>Играю</h4>
                <Button type='link' onClick={() => setModalVisible(true)}>Вступить</Button>
                <FindTeamModal
                    {...props}
                    visible={modalVisible}
                    user={props.user}
                    close={() => setModalVisible(false)}
                />
            </Space>
        </Divider>
        <TeamList teams={teamsPlayed} actions={null} loading={loadingTeamsPlayed} {...props} />
    </>);
};

export default TeamsSubPage;
