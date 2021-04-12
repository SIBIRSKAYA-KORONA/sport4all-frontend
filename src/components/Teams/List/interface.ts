import { Team } from 'Utils/types';
import { RouteComponentProps } from 'react-router-dom';

export enum TeamListItemAction {
    delete,
    add
}

export interface IProps extends RouteComponentProps {
    teams: Team[],
    loading: boolean,
    hideEmpty?: boolean,
    action: {
        type: TeamListItemAction,
        handler: (teamID:number) => Promise<void>
    } | null,
}
