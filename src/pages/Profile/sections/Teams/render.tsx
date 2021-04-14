import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { Divider, Button, Space, message } from 'antd';

import CONST from 'Constants';
import { Team, User } from 'Utils/types';
import TeamModel from 'Models/TeamModel';
import { TeamPlayerRoles } from 'Utils/enums';
import InvitesModel from 'Models/InvitesModel';
import TeamList from 'Components/Teams/List/render';
import LoadingContainer from 'Components/Loading/render';
import { TeamListItemActions } from 'Components/Teams/List/interface';
import FindTeamModal from 'Components/Teams/FindTeamModal/FindTeamModal';


interface IProps extends RouteComponentProps {
    profile: User,
    user: User
}

const TeamsSubPage = (props:IProps):JSX.Element => {
    const [loadingOwnTeams, setLoadingOwnTeams] = useState(true);
    const [teamsOwned, setTeamsOwned] = useState<Team[]>([]);

    const [loadingTeamsPlayed, setLoadingTeamsPlayed] = useState(true);
    const [teamsPlayed, setTeamsPlayer] = useState<Team[]>([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [canEdit, setCanEdit] = useState(false);

    useEffect(() => {
        setCanEdit(props.user.id === props.profile.id);
    }, [props.user, props.profile]);

    useEffect(() => {
        const load = () => {
            TeamModel.loadTeams(TeamPlayerRoles.owner, props.profile.id).then((teams:Team[]) => {
                setTeamsOwned(teams);
                setLoadingOwnTeams(false);
            });
            TeamModel.loadTeams(TeamPlayerRoles.player, props.profile.id).then((teams:Team[]) => {
                setTeamsPlayer(teams);
                setLoadingTeamsPlayed(false);
            });
        }
        load();
    }, [props.profile]);

    async function onSendInvite(team:Team) {
        return InvitesModel.fromPlayerToTeam(team, props.user)
            .then(() => { message.success('Приглашение выслано') })
            .catch(e => { message.error(e.toString()); });
    }

    return <LoadingContainer
        loading={loadingOwnTeams || loadingTeamsPlayed}
        empty={{ check:(!canEdit && teamsOwned.length + teamsPlayed.length === 0), message:'Нет команд'}}
    >
        {(canEdit || teamsOwned.length > 0) && <>
            <Divider orientation={'left'}>
                <Space direction='horizontal' size='small' align='baseline'>
                    <h4>{canEdit ? 'Тренирую' : 'Тренирует'}</h4>
                    {canEdit &&
                    <Button type='link'>
                        <Link to={CONST.PATHS.teams.create}>Создать</Link>
                    </Button>
                    }
                </Space>
            </Divider>
            <TeamList teams={teamsOwned} actions={null} loading={loadingOwnTeams} {...props}/>
        </>}

        {(canEdit || teamsPlayed.length > 0) && <>
            <Divider orientation={'left'}>
                <Space direction='horizontal' size='small' align='baseline'>
                    <h4>{canEdit ? 'Играю' : 'Играет'}</h4>
                    {canEdit && <>
                        <Button type='link' onClick={() => setModalVisible(true)}>Вступить</Button>
                        <FindTeamModal
                            {...props}
                            visible={modalVisible}
                            close={() => setModalVisible(false)}
                            actions={[{
                                type: TeamListItemActions.sendInvite,
                                handler: onSendInvite
                            }]}
                        />
                    </>}
                </Space>
            </Divider>
            <TeamList teams={teamsPlayed} actions={null} loading={loadingTeamsPlayed} {...props} />
        </>}
    </LoadingContainer>
};

export default TeamsSubPage;
