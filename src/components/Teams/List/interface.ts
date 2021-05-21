import { Team } from 'Utils/types';
import { RouteComponentProps } from 'react-router-dom';

export enum TeamListItemActions {
    delete,
}

export interface TeamListItemAction {
    type: TeamListItemActions,
    handler: (team:Team) => Promise<void>
}

export interface IProps extends RouteComponentProps {
    teams: Team[],
    loading: boolean,
    hideEmpty?: boolean,
    actions: TeamListItemAction[] | null
}
