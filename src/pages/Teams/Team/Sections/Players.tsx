import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Col, Divider, Input, message } from 'antd';

import TeamModel from 'Models/TeamModel';
import { InviteStatus } from 'Utils/enums';
import InvitesModel from 'Models/InvitesModel';
import { findPendingUserInvite } from 'Utils/structUtils';
import { Invite, InviteWithUser, Team, User } from 'Utils/types';
import TeamPlayersList from 'Components/Teams/PlayersList/render';
import { TeamPlayerListItemActions } from 'Components/Teams/PlayersList/interface';


interface IProps extends RouteComponentProps {
    team: Team,
    canEdit: boolean,
    reload: () => void,
}

function TeamPlayers(props: IProps): JSX.Element {
    const [loadingPlayers, setLoadingPlayers] = React.useState(false);
    const [playersToAdd, setPlayersToAdd] = React.useState<Array<User>>([]);
    const [invites, setInvites] = React.useState<InviteWithUser[]>([]);

    React.useEffect(() => {
        InvitesModel.loadInvitesToTheTeam(props.team, InviteStatus.Pending)
            .then((invites: InviteWithUser[]) => setInvites(invites));
    }, []);

    // Handlers
    async function onPlayerDelete(player:User) {
        if (!confirm('Уверены, что хотите исключить игрока из команды?')) return;
        TeamModel.removePlayerFromTheTeam(props.team.id, player.id)
            .then(() => props.reload())
            .catch(e => { message.error(e); });
    }

    const onPlayersSearch = (searchText) => {
        if (!searchText) return;
        TeamModel.loadPlayersToAdd(props.team.id, searchText)
            .then((players:User[]) => setPlayersToAdd(players))
            .finally(() => setLoadingPlayers(false));
    };

    async function onPlayerInvite(player:User) {
        return InvitesModel.fromTeamToPlayer(props.team, player)
            .then(() => props.reload());
    }

    async function replyToInvite(invite:Invite|undefined, state:InviteStatus.Accepted | InviteStatus.Rejected):Promise<void> {
        if (!invite) {
            message.error('Приглашение не найдено');
            return;
        }
        return InvitesModel.replyToInvite(invite.id, state)
            .then(() => {
                if (state === InviteStatus.Accepted) {
                    props.reload();
                    setInvites(invites.filter(i => i.id !== invite.id))
                }
            })
            .catch(e => { message.error(e.toString()) });
    }

    // render
    return (
        <Col>
            <Divider orientation={'left'}>Игроки</Divider>

            <TeamPlayersList
                {...props}
                players={props.team.players}
                loading={false}
                actions={props.canEdit && [{
                    type: TeamPlayerListItemActions.remove,
                    handler: onPlayerDelete,
                }]}
            />

            {props.canEdit && <>
                {invites.length > 0 && <>
                    <Divider orientation={'left'}>Приглашения</Divider>
                    <TeamPlayersList
                        {...props}
                        players={invites.map(i => i.user)}
                        invites={invites}
                        loading={false}
                        actions={[{
                            type: TeamPlayerListItemActions.accept,
                            handler: (player:User) => replyToInvite(findPendingUserInvite(invites, player), InviteStatus.Accepted),
                        },{
                            type: TeamPlayerListItemActions.reject,
                            handler: (player:User) => replyToInvite(findPendingUserInvite(invites, player), InviteStatus.Rejected),
                        }]}
                    />
                </>}

                <Divider orientation={'left'}>Добавить игроков</Divider>

                <Input.Search
                    loading={loadingPlayers}
                    placeholder={'Введите никнейм игрока'}
                    onSearch={onPlayersSearch}/>

                <TeamPlayersList
                    {...props}
                    players={playersToAdd}
                    loading={loadingPlayers}
                    hideEmpty
                    actions={[{
                        type: TeamPlayerListItemActions.invite,
                        handler: onPlayerInvite,
                    }]}
                />
            </>}
        </Col>
    );
}

export default TeamPlayers;
