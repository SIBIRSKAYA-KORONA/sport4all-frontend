import * as React from 'react';

import { InviteWithTournament } from 'Utils/types';
import TournamentModel from 'Models/TournamentModel';
import { tournamentMeta } from 'Components/Invite/List/metas';
import FindSomethingToInvite from 'Components/Invite/Modals/render';
import { InviteActionHandler, InviteActions } from 'Components/Invite/List/interface';


interface IProps {
    visible: boolean,
    close: () => void,
    invites: InviteWithTournament[],
    onInvite: InviteActionHandler,
}

const FindTournamentToInvite = (props:IProps):JSX.Element => {
    return <FindSomethingToInvite
        visible={props.visible}
        close={props.close}
        api={TournamentModel.searchTournaments}
        keyToCheck='tournament_id'
        meta={tournamentMeta}
        title='Найти турнир'
        actions={[{
            type    :InviteActions.invite,
            handler :props.onInvite
        }]}
    />;
};

export default FindTournamentToInvite;
