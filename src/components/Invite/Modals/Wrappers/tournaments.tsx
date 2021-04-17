import * as React from 'react';
import { useEffect, useState } from 'react';
import { message } from 'antd';

import { InviteStatus } from 'Utils/enums';
import InvitesModel from 'Models/InvitesModel';
import TournamentModel from 'Models/TournamentModel';
import { isTournamentInvite } from 'Utils/structUtils';
import { InviteWithTournament, Team } from 'Utils/types';
import { tournamentMeta } from 'Components/Invite/List/metas';
import FindSomethingToInvite from 'Components/Invite/Modals/render';
import { InviteActionHandler, InviteActions } from 'Components/Invite/List/interface';

interface IProps {
    visible: boolean,
    close: () => void,
    onInvite: InviteActionHandler,
    team: Team,
}

const FindTournamentToInvite = (props:IProps):JSX.Element => {
    const [loading, setLoading] = useState(true);
    const [invites, setInvites] = useState<InviteWithTournament[]>([]);

    useEffect(() => {
        if (!props.visible) return;
        InvitesModel.loadInvitesToTheTeam(props.team, InviteStatus.Pending)
            .then((invites: InviteWithTournament[]) => setInvites(invites.filter(i => isTournamentInvite(i))))
            .catch(e => { message.error(e.toString()) })
            .finally(() => setLoading(false));
    }, [props.visible]);

    return <FindSomethingToInvite
        loading={loading}
        invites={invites}
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
