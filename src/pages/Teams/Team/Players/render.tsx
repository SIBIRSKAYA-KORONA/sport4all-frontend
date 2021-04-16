import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Button, Col, Divider, Empty, Input, message, Space } from 'antd';

import TeamModel from 'Models/TeamModel';
import InvitesModel from 'Models/InvitesModel';
import { Team, User } from 'Utils/types';
import TeamPlayersList from 'Components/Teams/PlayersList/render';
import { TeamPlayerListItemActions } from 'Components/Teams/PlayersList/interface';
import FindUserToInvite from 'Components/Invite/Modals/Wrappers/users';


interface IProps extends RouteComponentProps {
    team: Team,
    canEdit: boolean,
    reload: () => void,
}

function TeamPlayersSection(props: IProps): JSX.Element {
    const [modalVisible, setModalVisible] = React.useState(false);

    // Handlers
    async function onPlayerDelete(player:User) {
        if (!confirm('Уверены, что хотите исключить игрока из команды?')) return;
        TeamModel.removePlayerFromTheTeam(props.team.id, player.id)
            .then(() => props.reload())
            .catch(e => { message.error(e); });
    }

    async function onPlayerInvite(player:User) {
        return InvitesModel.fromTeamToPlayer(props.team, player).then(() => props.reload());
    }

    return (
        <>
            <Divider orientation={'left'}>
                <Space direction='horizontal' size='small' align='baseline'>
                    <h4>Игроки</h4>
                    {props.canEdit && <>
                        {props.team.players.length !== 0 &&
                            <Button type='link' onClick={() => setModalVisible(true)}>Пригласить</Button>
                        }
                        <FindUserToInvite
                            visible={modalVisible}
                            close={() => setModalVisible(false)}
                            onInvite={onPlayerInvite}
                        />
                    </>}
                </Space>
            </Divider>

            {props.team.players.length === 0
                ? <Empty description={<Space direction='vertical' align='center' size='middle'>
                    <span>В команде ещё никого нет</span>
                    <Button onClick={() => setModalVisible(true)}>Пригласить спортсменов</Button>
                </Space>}/>
                : <TeamPlayersList
                    {...props}
                    players={props.team.players}
                    loading={false}
                    actions={props.canEdit && [{
                        type: TeamPlayerListItemActions.remove,
                        handler: onPlayerDelete,
                    }]}
                />
            }
        </>
    );
}

export default TeamPlayersSection;
