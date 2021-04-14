import './style.scss';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Avatar, Button, Col, message, Row, Tabs, Typography } from 'antd';
const { Title, Paragraph } = Typography;

import { Team, Tournament } from 'Utils/types';
import { TeamSections } from 'Utils/enums';
import { lettersForAvatar } from 'Utils/utils';
import InvitesModel from 'Models/InvitesModel';
import BasePage from 'Components/BasePage/render';
import TeamPlayers from 'Pages/Teams/Team/Sections/Players';
import TeamPublicInfo from 'Pages/Teams/Team/Sections/PublicInfo';
import FindTournamentModal from 'Components/Tournaments/FindTournamentModal/FindTeamModal';
import { TournamentInviteListItemActions } from 'Components/Invite/TournamentList/interface';


interface IProps extends RouteComponentProps {
    loading: boolean,
    canEdit: boolean,
    team: Team | null,
    reload: () => void
}

const TeamPageRender = (props: IProps):JSX.Element => {
    const [modalVisible, setModalVisible] = React.useState(false);

    async function onSendInvite(t:Tournament) {
        return InvitesModel.fromTeamToTournament(t, props.team)
            .then(() => { message.success('Приглашение выслано') })
            .catch(e => { message.error(e.toString()); });
    }

    return (
        <BasePage {...props} loading={props.loading}>{props.team && <>
            <Row>
                <Col flex='100px'>
                    <Avatar size={90} src={props.team.avatar.url}>{lettersForAvatar(props.team.name)}</Avatar>
                </Col>
                <Col flex='auto'>
                    <Title level={2}>{props.team.name}</Title>
                    {props.team.about && <Paragraph>{props.team.about}</Paragraph>}
                    {props.team.location && <Paragraph>{props.team.location}</Paragraph>}
                </Col>
                <Button type='primary' onClick={() => setModalVisible(true)}>Найти турнир</Button>
                <FindTournamentModal
                    {...props}
                    title='Найти турнир'
                    visible={modalVisible}
                    actions={[{
                        type: TournamentInviteListItemActions.sendInvite,
                        handler: onSendInvite,
                    }]}
                    close={() => setModalVisible(false)}
                />
            </Row>
            <Tabs className='full-width'>
                <Tabs.TabPane tab='Игроки' key={TeamSections.Players}>
                    <TeamPlayers {...props}
                        team={props.team}
                        reload={props.reload}
                        canEdit={props.canEdit}
                    />
                </Tabs.TabPane>
                {props.canEdit && props.team && <>
                    <Tabs.TabPane tab='Настройки' key={TeamSections.PublicInfo}>
                        <TeamPublicInfo teamId={props.team.id} reload={props.reload}/>
                    </Tabs.TabPane>
                </>}
            </Tabs>
        </>}</BasePage>
    )
}

export default TeamPageRender;
