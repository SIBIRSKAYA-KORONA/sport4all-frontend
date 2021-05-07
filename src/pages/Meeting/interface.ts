import { Meeting, Stats, Tournament } from 'Utils/types';
import { RouteComponentProps } from 'react-router-dom';

export interface IProps extends RouteComponentProps {
    meeting?: Meeting,
    stats?: Array<Stats>,
    handlePointsSave: () => void,
    handleTeamsAdd: (values:[any]) => void,
    changeStatus: () => void,
    loadingMeeting: boolean,
    canEdit: boolean,
    reload: () => void,
    tournament?: Tournament,
}

export type visibleModals = {
    stats: boolean,
    addTeams: boolean,
    edit: boolean,
};

export type visibleModalsKey = 'stats' | 'addTeams';
