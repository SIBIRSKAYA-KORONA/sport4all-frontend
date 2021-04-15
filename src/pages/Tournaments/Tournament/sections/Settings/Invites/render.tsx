import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Button, Divider, message } from 'antd';

import { InviteStatus } from 'Utils/enums';
import InvitesModel from 'Models/InvitesModel';
import InviteList from 'Components/Invite/List/render';
import { teamMeta } from 'Components/Invite/List/metas';
import LoadingContainer from 'Components/Loading/render';
import { findPendingTeamInvite } from 'Utils/structUtils';
import { InviteActions } from 'Components/Invite/List/interface';
import { Invite, InviteWithTeam, Team, Tournament } from 'Utils/types';


interface IProps extends RouteComponentProps {
    tournament: Tournament,
}

function TournamentInvites(props: IProps): JSX.Element {
    const [loading, setLoading] = React.useState(true);
    const [invitesFromUs, setInvitesFromUs] = React.useState<InviteWithTeam[]>([]);
    const [invitesToUs, setInvitesToUs] = React.useState<InviteWithTeam[]>([]);

    async function reload() {
        setLoading(true);
        return InvitesModel.loadInvitesToTheTournament(props.tournament, InviteStatus.Pending)
            .then((invites: InviteWithTeam[]) => {
                setInvitesFromUs(invites.filter(i => i.type === 'direct'));
                setInvitesToUs(invites.filter(i => i.type === 'indirect'));
            })
            .catch(e => { message.error(e.toString()) })
            .finally(() => setTimeout(() => setLoading(false), 500));
    }

    React.useEffect(() => {
        reload();
    }, [props.tournament]);

    async function replyToInvite(invite:Invite|undefined, state:InviteStatus.Accepted | InviteStatus.Rejected):Promise<void> {
        if (!invite) {
            message.error('Приглашение не найдено');
            return;
        }
        return InvitesModel.replyToInvite(invite.id, state)
            .then(() => void 0)
            .catch(e => { message.error(e.toString()) });
    }

    return (<LoadingContainer
        loading={loading}
        empty={{
            check: invitesToUs.length + invitesFromUs.length === 0,
            message: 'Ещё нет приглашений'
        }}
    >
        <Button onClick={() => reload()}>Обновить</Button>
        {invitesFromUs.length > 0 && <>
            <Divider orientation='left' type='horizontal'>Приглашения от нас</Divider>
            <InviteList
                items={invitesFromUs.map(i => i.team)}
                keyToCheck={'team_id'}
                invites={invitesFromUs}
                loading={false}
                actions={[]}
                meta={teamMeta}
            />
        </>}

        {invitesToUs.length > 0 && <>
            <Divider orientation='left' type='horizontal'>Приглашения нам</Divider>
            <InviteList
                items={invitesToUs.map(i => i.team)}
                keyToCheck={'team_id'}
                invites={invitesToUs}
                meta={teamMeta}
                loading={false}
                actions={[{
                    type: InviteActions.accept,
                    handler: (team:Team) => replyToInvite(findPendingTeamInvite(invitesToUs, team), InviteStatus.Accepted),
                },{
                    type: InviteActions.reject,
                    handler: (team:Team) => replyToInvite(findPendingTeamInvite(invitesToUs, team), InviteStatus.Rejected),
                }]}
            />
        </>}
    </LoadingContainer>);
}

export default TournamentInvites;
