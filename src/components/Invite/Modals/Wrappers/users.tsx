import * as React from 'react';
import { useEffect, useState } from 'react';

import { InviteWithUser, Team } from 'Utils/types';
import ProfileModel from 'Models/ProfileModel';
import { userMeta } from 'Components/Invite/List/metas';
import FindSomethingToInvite from 'Components/Invite/Modals/render';
import { InviteActionHandler, InviteActions } from 'Components/Invite/List/interface';
import InvitesModel from 'Models/InvitesModel';
import { InviteStatus } from 'Utils/enums';
import { isTournamentInvite } from 'Utils/structUtils';
import { message } from 'antd';


interface IProps {
    visible: boolean,
    close: () => void,
    onInvite: InviteActionHandler,
    team: Team,
}

const FindUserToInvite = (props:IProps):JSX.Element => {
    const [loading, setLoading] = useState(true);
    const [invites, setInvites] = useState<InviteWithUser[]>([]);

    useEffect(() => {
        if (!props.visible) return;
        InvitesModel.loadInvitesToTheTeam(props.team, InviteStatus.Pending)
            .then((invites: InviteWithUser[]) => setInvites(invites.filter(i => !isTournamentInvite(i))))
            .catch(e => { message.error(e.toString()) })
            .finally(() => setLoading(false));
    }, [props.visible]);

    return <FindSomethingToInvite
        loading={loading}
        invites={invites}
        visible={props.visible}
        close={props.close}
        api={ProfileModel.searchUsers}
        keyToCheck='invited_id'
        meta={userMeta}
        title='Пригласить спортсмена'
        actions={[{
            type    :InviteActions.invite,
            handler :props.onInvite
        }]}
    />;
};

export default FindUserToInvite;
