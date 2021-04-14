import { Invite, User } from 'Utils/types';
import { RouteComponentProps } from 'react-router-dom';

export enum TeamPlayerListItemActions {
    accept,
    reject,
    invite,
    remove,
}

export interface TeamPlayerListItemAction {
    type: TeamPlayerListItemActions,
    handler: (player:User) => Promise<void>
}

export interface IProps extends RouteComponentProps {
    players: User[],
    invites?: Invite[],
    loading: boolean,
    hideEmpty?: boolean,
    actions: TeamPlayerListItemAction[] | null
}
