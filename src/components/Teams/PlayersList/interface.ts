import { User } from 'Utils/types';
import { RouteComponentProps } from 'react-router-dom';
import { TextMeta } from 'Components/Invite/List/ItemActions';

export enum TeamPlayerListItemActions {
    accept,
    reject,
    invite,
    remove,
}

export enum TeamPlayerListItemTexts {
    pending,
    accepted,
    rejected
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
