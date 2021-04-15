import * as React from 'react';

import { Button, Divider, Empty, message, Space, Spin } from 'antd';

import { InviteStatus } from 'Utils/enums';
import InvitesModel from 'Models/InvitesModel';
import TeamList from 'Components/Teams/List/render';
import { RouteComponentProps } from 'react-router-dom';
import LoadingContainer from 'Components/Loading/render';
import { findPendingTeamInvite } from 'Utils/structUtils';
import { Invite, InviteWithTeam, Team, User } from 'Utils/types';
import { TeamListItemActions } from 'Components/Teams/List/interface';
import InviteList from 'Components/Invite/List/render';
import { teamMeta } from 'Components/Invite/List/metas';
import { InviteActions } from 'Components/Invite/List/interface';


interface IProps extends RouteComponentProps {
    user: User
}

const ProfilePersonalInvites = (props:IProps):JSX.Element => {
    const [loading, setLoading] = React.useState(true);
    const [invitesToMe, setInvitesToMe] = React.useState<InviteWithTeam[]>([]);
    const [invitesFromMe, setInvitesFromMe] = React.useState<InviteWithTeam[]>([]);

    async function replyToInvite(invite:Invite|undefined, state:InviteStatus.Accepted | InviteStatus.Rejected):Promise<void> {
        if (!invite) {
            message.error('Приглашение не найдено');
            return;
        }
        return InvitesModel.replyToInvite(invite.id, state)
            .then(() => void 0)
            .catch(e => { message.error(e.toString()) });
    }

    async function reload() {
        setLoading(true);
        return InvitesModel.getInvites()
            .then((invites:InviteWithTeam[]) => {
                setInvitesFromMe(invites.filter(invite => invite.type === 'indirect'))
                setInvitesToMe(invites.filter(invite => invite.type === 'direct'))
            })
            .catch(e => { message.error(e) })
            .finally(() => setTimeout(() => setLoading(false), 500));
    }

    React.useEffect(() => {
        reload();
    }, []);

    return (<LoadingContainer
        loading={loading}
        empty={{
            check:invitesToMe.length + invitesFromMe.length === 0,
            message:(<Space direction='vertical' align='center' size='middle'>
                <span>Приглашений нет</span>
                <span>Приглашения в ваши команды находятся<br/>в кабинете соответствующей команды</span>
                <Button onClick={() => reload()}>Обновить</Button>
            </Space>)
        }}
    >
        <Button onClick={() => reload()}>Обновить</Button>
        {invitesToMe.length > 0 && <>
            <Divider orientation={'left'}>Вам</Divider>
            <InviteList
                keyToCheck='team_id'
                items={invitesToMe.map(invite => invite.team)}
                invites={invitesToMe}
                loading={false}
                meta={teamMeta}
                actions={[{
                    type:       InviteActions.accept,
                    handler:    (team:Team) => replyToInvite(findPendingTeamInvite(invitesToMe, team), InviteStatus.Accepted)
                },{
                    type:       InviteActions.reject,
                    handler:    (team:Team) => replyToInvite(findPendingTeamInvite(invitesToMe, team), InviteStatus.Rejected)
                }]}
            />
        </>}
        {invitesFromMe.length > 0 && <>
            <Divider orientation={'left'}>От вас</Divider>
            <InviteList
                keyToCheck='team_id'
                items={invitesFromMe.map(invite => invite.team)}
                invites={invitesFromMe}
                loading={false}
                actions={[]}
                meta={teamMeta}
            />
        </>}
    </LoadingContainer>);
};

export default ProfilePersonalInvites;
