import { Invite, User } from 'Utils/types';
import { RouteComponentProps } from 'react-router-dom';

export enum TeamPlayerListItemActions {
    remove,
}

export interface TeamPlayerListItemAction {
    type: TeamPlayerListItemActions,
    handler: (player:User) => Promise<void>
}

export interface IProps extends RouteComponentProps {
    players: User[],
    loading: boolean,
    hideEmpty?: boolean,
    actions: TeamPlayerListItemAction[] | null
}
