import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Col, Divider, Input, message } from 'antd';

import { Team, User } from 'Utils/types';
import TeamModel from 'Models/TeamModel';
import TeamPlayersList from 'Components/Teams/PlayersList/render';
import { TeamPlayerListItemActions } from 'Components/Teams/PlayersList/interface';
import InvitesModel from 'Models/InvitesModel';


interface IProps extends RouteComponentProps {
    team: Team,
    canEdit: boolean,
    reload: () => void,
}

function TeamPlayers(props: IProps): JSX.Element {
    const teamId = props.match.params['id'];
    const [loadingPlayers, setLoadingPlayers] = React.useState(false);
    const [playersToAdd, setPlayersToAdd] = React.useState<Array<User>>([]);

    // Handlers
    async function onPlayerDelete(player:User) {
        if (!confirm('Уверены, что хотите исключить игрока из команды?')) return;
        TeamModel.instance.removePlayerFromTheTeam(teamId, player.id)
            .then(() => props.reload())
            .catch(e => { message.error(e); });
    }

    const onPlayersSearch = (searchText) => {
        if (!searchText) return;
        TeamModel.instance.loadPlayersToAdd(teamId, searchText, 5)
            .then(players => setPlayersToAdd(players))
            .finally(() => setLoadingPlayers(false));
    };

    async function onPlayerInvite(player:User) {
        return InvitesModel.inviteToTheTeam(props.team, player)
            .then(() => props.reload());
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
