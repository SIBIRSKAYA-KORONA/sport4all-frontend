import * as React from 'react';

import TeamModel from 'Models/TeamModel';
import { InviteWithTeam } from 'Utils/types';
import { teamMeta } from 'Components/Invite/List/metas';
import FindSomethingToInvite from 'Components/Invite/Modals/render';
import { InviteActionHandler, InviteActions } from 'Components/Invite/List/interface';


interface IProps {
    visible: boolean,
    close: () => void,
    invites?: InviteWithTeam[],
    onInvite: InviteActionHandler,
}

const FindTeamToInvite = (props:IProps):JSX.Element => {
    return <FindSomethingToInvite
        visible={props.visible}
        close={props.close}
        api={TeamModel.searchTeams}
        keyToCheck='invited_id'
        meta={teamMeta}
        title='Пригласить команду'
        actions={[{
            type    :InviteActions.invite,
            handler :props.onInvite
        }]}
    />;
};

export default FindTeamToInvite;
