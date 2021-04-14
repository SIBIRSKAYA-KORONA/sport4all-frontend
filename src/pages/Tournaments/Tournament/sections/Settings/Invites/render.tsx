import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Divider, message } from 'antd';

import { InviteStatus } from 'Utils/enums';
import InvitesModel from 'Models/InvitesModel';
import { findPendingTeamInvite } from 'Utils/structUtils';
import { Invite, InviteWithTeam, Team, Tournament } from 'Utils/types';
import LoadingContainer from 'Components/Loading/render';
import TeamList from 'Components/Teams/List/render';
import { TeamListItemActions } from 'Components/Teams/List/interface';


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
        {invitesFromUs.length > 0 && <>
            <Divider orientation='left' type='horizontal'>Приглашения от нас</Divider>
            <TeamList
                {...props}
                teams={invitesFromUs.map(i => i.team)}
                invites={invitesFromUs}
                loading={false}
                actions={[]}
            />
        </>}

        {invitesToUs.length > 0 && <>
            <Divider orientation='left' type='horizontal'>Приглашения нам</Divider>
            <TeamList
                {...props}
                teams={invitesToUs.map(i => i.team)}
                invites={invitesToUs}
                loading={false}
                actions={[{
                    type: TeamListItemActions.accept,
                    handler: (team:Team) => replyToInvite(findPendingTeamInvite(invitesToUs, team), InviteStatus.Accepted),
                },{
                    type: TeamListItemActions.reject,
                    handler: (team:Team) => replyToInvite(findPendingTeamInvite(invitesToUs, team), InviteStatus.Rejected),
                }]}
            />
        </>}
    </LoadingContainer>);
}

export default TournamentInvites;
