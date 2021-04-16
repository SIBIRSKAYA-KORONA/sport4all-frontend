import * as React from 'react';

import { Button, Divider, message, Space } from 'antd';

import { InviteStatus } from 'Utils/enums';
import InvitesModel from 'Models/InvitesModel';
import { RouteComponentProps } from 'react-router-dom';
import LoadingContainer from 'Components/Loading/render';
import { Invite, InviteWithTournament, InviteWithUser, Team, Tournament, User } from 'Utils/types';
import InviteList from 'Components/Invite/List/render';
import { InviteActions } from 'Components/Invite/List/interface';
import { replyToInvite } from 'Components/Invite/utils';
import { findPendingTournamentInvite, findPendingUserInvite } from 'Utils/structUtils';
import { tournamentMeta, userMeta } from 'Components/Invite/List/metas';
import FindTournamentToInvite from 'Components/Invite/Modals/Wrappers/tournaments';
import FindUserToInvite from 'Components/Invite/Modals/Wrappers/users';


interface IProps {
    team: Team,
    user: User,
}

const TeamSettingsInvitesSection = (props:IProps):JSX.Element => {
    const [loading, setLoading] = React.useState(true);
    const [modalVisibles, setModalVisibles] = React.useState<{ tournaments?:boolean, users?:boolean }>({});

    const [userInvitesToMe, setUserInvitesToMe] = React.useState<InviteWithUser[]>([]);
    const [userInvitesFromMe, setUserInvitesFromMe] = React.useState<InviteWithUser[]>([]);

    const [tournamentInvitesToMe, setTournamentInvitesToMe] = React.useState<InviteWithTournament[]>([]);
    const [tournamentInvitesFromMe, setTournamentInvitesFromMe] = React.useState<InviteWithTournament[]>([]);

    async function reload() {
        setLoading(true);
        return InvitesModel.loadInvitesToTheTeam(props.team, InviteStatus.Pending)
            .then((invites: Invite[]) => {
                setUserInvitesToMe(invites.filter(i => i.type === 'indirect' && !Object.prototype.hasOwnProperty.call(i, 'tournament')) as InviteWithUser[]);
                setUserInvitesFromMe(invites.filter(i => i.type === 'direct' && !Object.prototype.hasOwnProperty.call(i, 'tournament')) as InviteWithUser[]);
                setTournamentInvitesToMe(invites.filter(i => i.type === 'direct' && Object.prototype.hasOwnProperty.call(i, 'tournament')) as InviteWithTournament[]);
                setTournamentInvitesFromMe(invites.filter(i => i.type === 'indirect' && Object.prototype.hasOwnProperty.call(i, 'tournament')) as InviteWithTournament[]);
            })
            .catch(e => { message.error(e) })
            .finally(() => setTimeout(() => setLoading(false), 500));
    }

    React.useEffect(() => { reload(); }, []);

    function toggleModal(key: 'tournaments' | 'users') {
        setModalVisibles(prev => ({ ...prev, [key]:!prev[key] }))
    }

    return (<Space direction='vertical' size='large' className='full-width'>
        <Button onClick={() => reload()}>Обновить</Button>

        <Space direction='horizontal' size='small' align='baseline'>
            <h2>Турниры</h2>
            {tournamentInvitesToMe.length + tournamentInvitesFromMe.length !== 0 &&
                <Button type='link' onClick={() => toggleModal('tournaments')}>Участвовать</Button>
            }
            <FindTournamentToInvite
                onInvite={(t:Tournament) => InvitesModel.fromTeamToTournament(t, props.team).then(() => void 0)}
                invites={tournamentInvitesToMe.concat(tournamentInvitesFromMe)}
                visible={modalVisibles.tournaments}
                close={() => toggleModal('tournaments')}
            />
        </Space>
        <LoadingContainer
            loading={loading}
            empty={{
                check:tournamentInvitesToMe.length + tournamentInvitesFromMe.length === 0,
                message:(<Space direction='vertical' align='center' size='middle'>
                    <span>Приглашений нет</span>
                    <Button onClick={() => toggleModal('tournaments')}>Участвовать</Button>
                </Space>)
            }}
        >
            {tournamentInvitesToMe.length > 0 && <>
                <Divider orientation={'left'}>Вам</Divider>
                <InviteList
                    items={tournamentInvitesToMe.map(i => i.tournament)}
                    invites={tournamentInvitesToMe}
                    keyToCheck={'tournament_id'}
                    loading={false}
                    meta={tournamentMeta}
                    actions={[{
                        type:       InviteActions.accept,
                        handler:    (t:Tournament) => replyToInvite(findPendingTournamentInvite(tournamentInvitesToMe, t), InviteStatus.Accepted)
                    }, {
                        type:       InviteActions.reject,
                        handler:    (t:Tournament) => replyToInvite(findPendingTournamentInvite(tournamentInvitesToMe, t), InviteStatus.Rejected)
                    }]}
                />
            </>}
            {tournamentInvitesFromMe.length > 0 && <>
                <Divider orientation={'left'}>От нас</Divider>
                <InviteList
                    items={tournamentInvitesFromMe.map(i => i.tournament)}
                    invites={tournamentInvitesFromMe}
                    keyToCheck={'tournament_id'}
                    loading={false}
                    meta={tournamentMeta}
                    actions={[]}
                />
            </>}
        </LoadingContainer>

        <Space direction='horizontal' size='small' align='baseline'>
            <h2>Спортсмены</h2>
            {userInvitesToMe.length + userInvitesFromMe.length !== 0 &&
                <Button type='link' onClick={() => toggleModal('users')}>Пригласить</Button>
            }
            <FindUserToInvite
                onInvite={(u:User) => InvitesModel.fromTeamToPlayer(props.team, u).then(() => void 0)}
                invites={userInvitesToMe.concat(userInvitesFromMe)}
                visible={modalVisibles.users}
                close={() => toggleModal('users')}
            />
        </Space>
        <LoadingContainer
            loading={loading}
            empty={{
                check:userInvitesToMe.length + userInvitesFromMe.length === 0,
                message:(<Space direction='vertical' align='center' size='middle'>
                    <span>Приглашений нет</span>
                    <Button onClick={() => toggleModal('users')}>Пригласить</Button>
                </Space>)
            }}
        >
            {userInvitesToMe.length > 0 && <>
                <Divider orientation={'left'}>Вам</Divider>
                <InviteList
                    items={userInvitesToMe.map(i => i.user)}
                    invites={userInvitesToMe}
                    keyToCheck={'invited_id'}
                    loading={false}
                    meta={userMeta}
                    actions={[{
                        type:       InviteActions.accept,
                        handler:    (u:User) => replyToInvite(findPendingUserInvite(userInvitesToMe, u), InviteStatus.Accepted)
                    }, {
                        type:       InviteActions.reject,
                        handler:    (u:User) => replyToInvite(findPendingUserInvite(userInvitesToMe, u), InviteStatus.Rejected)
                    }]}
                />
            </>}
            {userInvitesFromMe.length > 0 && <>
                <Divider orientation={'left'}>От нас</Divider>
                <InviteList
                    items={userInvitesFromMe.map(i => i.user)}
                    invites={userInvitesFromMe}
                    keyToCheck={'invited_id'}
                    loading={false}
                    meta={userMeta}
                    actions={[]}
                />
            </>}
        </LoadingContainer>
    </Space>);
};

export default TeamSettingsInvitesSection;
