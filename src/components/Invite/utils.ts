import { message } from 'antd';
import { Invite } from 'Utils/types';
import { InviteStatus } from 'Utils/enums';
import InvitesModel from 'Models/InvitesModel';

export async function replyToInvite(invite:Invite|undefined, state:InviteStatus.Accepted | InviteStatus.Rejected):Promise<void> {
    if (!invite) {
        message.error('Приглашение не найдено');
        return;
    }
    return InvitesModel.replyToInvite(invite.id, state)
        .then(() => void 0)
        .catch(e => { message.error(e.toString()) });
}
