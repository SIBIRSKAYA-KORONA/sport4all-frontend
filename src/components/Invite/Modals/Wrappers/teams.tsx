import * as React from 'react';
import { message } from 'antd';
import { useEffect, useState } from 'react';

import TeamModel from 'Models/TeamModel';
import { InviteWithTeam } from 'Utils/types';
import HttpStatusCode from 'Utils/httpErrors';
import { teamMeta } from 'Components/Invite/List/metas';
import FindSomethingToInvite from 'Components/Invite/Modals/render';
import { InviteActionHandler, InviteActions } from 'Components/Invite/List/interface';


interface IProps {
    visible: boolean,
    close: () => void,
    onInvite: InviteActionHandler,
    api: (...args) => Promise<HttpStatusCode|InviteWithTeam[]>,
}

const FindTeamToInvite = (props:IProps):JSX.Element => {
    const [loading, setLoading] = useState(true);
    const [invites, setInvites] = useState<InviteWithTeam[]>([]);

    useEffect(() => {
        if (!props.visible) return;
        props.api()
            .then((invites: InviteWithTeam[]) => setInvites(invites))
            .catch(e => {
                console.error(e);
                message.error(e.toString());
            })
            .finally(() => setLoading(false));
    }, [props.visible]);

    return <FindSomethingToInvite
        loading={loading}
        invites={invites}
        visible={props.visible}
        close={props.close}
        api={TeamModel.searchTeams}
        keyToCheck='invited_id'
        meta={teamMeta}
        title='Выслать приглашение команде'
        actions={[{
            type    :InviteActions.invite,
            handler :props.onInvite
        }]}
    />;
};

export default FindTeamToInvite;
