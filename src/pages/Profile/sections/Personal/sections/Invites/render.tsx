import * as React from 'react';

import { Divider, Empty, message, Spin } from 'antd';

import { InviteStatus } from 'Utils/enums';
import InvitesModel from 'Models/InvitesModel';
import TeamList from 'Components/Teams/List/render';
import { findPendingTeamInvite } from 'Utils/structUtils';
import { RouteComponentProps } from 'react-router-dom';
import { Invite, InviteForUser, Team, User } from 'Utils/types';
import { TeamListItemActions } from 'Components/Teams/List/interface';


interface IProps extends RouteComponentProps {
    user: User
}

const ProfilePersonalInvites = (props:IProps):JSX.Element => {
    const [loading, setLoading] = React.useState(true);
    const [invitesToMe, setInvitesToMe] = React.useState<InviteForUser[]>([]);
    const [invitesFromMe, setInvitesFromMe] = React.useState<InviteForUser[]>([]);

    async function replyToInvite(invite:Invite|undefined, state:InviteStatus.Accepted | InviteStatus.Rejected):Promise<void> {
        if (!invite) {
            message.error('Приглашение не найдено');
            return;
        }
        return InvitesModel.replyToInvite(invite.id, state)
            .then(() => { message.success('Приглашение отправлено') })
            .catch(e => { message.error(e.toString()) });
    }

    React.useEffect(() => {
        InvitesModel.getInvites()
            .then((invites:InviteForUser[]) => {
                setInvitesFromMe(invites.filter(invite => invite.type === 'indirect'))
                setInvitesToMe(invites.filter(invite => invite.type === 'direct'))
            })
            .catch(e => { message.error(e) })
            .finally(() => setLoading(false));
    }, []);

    return (loading
        ? <Spin/>
        : invitesToMe.length + invitesFromMe.length > 0
            ? <>
                {invitesToMe.length > 0 && <>
                    <Divider orientation={'left'}>Вам</Divider>
                    <TeamList
                        {...props}
                        teams={invitesToMe.map(invite => invite.team)}
                        invites={invitesToMe}
                        loading={false}
                        actions={[{
                            type:       TeamListItemActions.accept,
                            handler:    (team:Team) => replyToInvite(findPendingTeamInvite(invitesToMe, team), InviteStatus.Accepted)
                        },{
                            type:       TeamListItemActions.reject,
                            handler:    (team:Team) => replyToInvite(findPendingTeamInvite(invitesToMe, team), InviteStatus.Rejected)
                        }
                        ]}
                    />
                </>}
                {invitesFromMe.length > 0 && <>
                    <Divider orientation={'left'}>От вас</Divider>
                    <TeamList
                        {...props}
                        teams={invitesFromMe.map(invite => invite.team)}
                        invites={invitesFromMe}
                        loading={false}
                        actions={[]}
                    />
                </>}
            </>
            : <Empty description={
                <span>Приглашений нет<br/>Отправьте заявку в команду или<br/>подождите пока кто-нибудь пригласит вас</span>
            }/>
    );
};

export default ProfilePersonalInvites;
