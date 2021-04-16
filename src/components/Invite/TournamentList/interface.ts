import { Tournament } from 'Utils/types';
import { RouteComponentProps } from 'react-router-dom';

export enum TournamentInviteListItemActions {

}

export interface TournamentInviteListItemAction {
    type: TournamentInviteListItemActions,
    handler: (t:Tournament) => Promise<void>
}

export interface IProps extends RouteComponentProps {
    tournaments: Tournament[],
    loading: boolean,
    hideEmpty?: boolean,
    actions: TournamentInviteListItemAction[] | null
}
