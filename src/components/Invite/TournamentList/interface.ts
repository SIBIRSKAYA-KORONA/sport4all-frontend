import { InviteWithTournament, Tournament, User } from 'Utils/types';
import { RouteComponentProps } from 'react-router-dom';

export enum TournamentInviteListItemActions {
    accept,
    reject
}

export interface TournamentInviteListItemAction {
    type: TournamentInviteListItemActions,
    handler: (t:Tournament) => Promise<void>
}

export interface IProps extends RouteComponentProps {
    tournaments: Tournament[],
    invites?: InviteWithTournament[],
    loading: boolean,
    hideEmpty?: boolean,
    actions: TournamentInviteListItemAction[] | null
}
