import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { message } from 'antd';

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
    const [invites, setInvites] = React.useState<InviteWithTeam[]>([]);

    async function reload() {
        setLoading(true);
        return InvitesModel.loadInvitesToTheTournament(props.tournament, InviteStatus.Pending)
            .then((invites: InviteWithTeam[]) => setInvites(invites))
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
            check: invites.length === 0,
            message: 'Ещё нет приглашений'
        }}
    >
        <TeamList
            {...props}
            teams={invites.map(i => i.team)}
            invites={invites}
            loading={false}
            actions={[{
                type: TeamListItemActions.accept,
                handler: (team:Team) => replyToInvite(findPendingTeamInvite(invites, team), InviteStatus.Accepted),
            },{
                type: TeamListItemActions.reject,
                handler: (team:Team) => replyToInvite(findPendingTeamInvite(invites, team), InviteStatus.Rejected),
            }]}
        />
    </LoadingContainer>);
}

export default TournamentInvites;
