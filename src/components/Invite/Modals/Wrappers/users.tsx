import * as React from 'react';

import { InviteWithUser } from 'Utils/types';
import ProfileModel from 'Models/ProfileModel';
import { userMeta } from 'Components/Invite/List/metas';
import FindSomethingToInvite from 'Components/Invite/Modals/render';
import { InviteActionHandler, InviteActions } from 'Components/Invite/List/interface';


interface IProps {
    visible: boolean,
    close: () => void,
    invites?: InviteWithUser[],
    onInvite: InviteActionHandler,
}

const FindUserToInvite = (props:IProps):JSX.Element => {
    return <FindSomethingToInvite
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
