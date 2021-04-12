import { Meeting, Stats } from 'Utils/types';
import { RouteComponentProps } from 'react-router-dom';

export interface IProps extends RouteComponentProps {
    meeting?: Meeting,
    stats?: Array<Stats>,
    handlePointsSave: () => void,
    handleTeamsAdd: (values:[any]) => void,
    changeStatus: () => void,
    loadingMeeting: boolean,
    canEdit: boolean,
    reload: () => void
}

export type visibleModals = {
    stats: boolean,
    addTeams: boolean
};

export type visibleModalsKey = 'stats' | 'addTeams';
