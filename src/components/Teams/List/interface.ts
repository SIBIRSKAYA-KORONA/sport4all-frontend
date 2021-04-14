import { Invite, Team } from 'Utils/types';
import { RouteComponentProps } from 'react-router-dom';

export enum TeamListItemActions {
    delete,
    add,
    sendInvite,
    accept,
    reject
}

export interface TeamListItemAction {
    type: TeamListItemActions,
    handler: (team:Team) => Promise<void>
}

export interface IProps extends RouteComponentProps {
    teams: Team[],
    invites?: Invite[],
    loading: boolean,
    hideEmpty?: boolean,
    actions: TeamListItemAction[] | null
}
