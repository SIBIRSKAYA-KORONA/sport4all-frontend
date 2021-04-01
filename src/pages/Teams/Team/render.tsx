import './style.scss';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Avatar, Col, Row, Tabs, Typography } from 'antd';
const { Title, Paragraph } = Typography;

import { Team } from 'Utils/types';
import { TeamSections } from 'Utils/enums';
import { lettersForAvatar } from 'Utils/utils';
import BasePage from 'Components/BasePage/render';
import TeamPlayers from 'Pages/Teams/Team/Sections/Players';
import TeamPublicInfo from 'Pages/Teams/Team/Sections/PublicInfo';


interface IProps extends RouteComponentProps {
    loading: boolean,
    canEdit: boolean,
    team: Team | null,
    reload: () => void
}

const TeamPageRender = (props: IProps):JSX.Element => {
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
            </Row>
            <Tabs className='full-width'>
                <Tabs.TabPane tab='Игроки' key={TeamSections.Players}>
                    <TeamPlayers {...props}
                        reload={props.reload}
                        canEdit={props.canEdit}
                        players={props.team.players}
                    />
                </Tabs.TabPane>
                {props.canEdit && props.team &&
                    <Tabs.TabPane tab='Настройки' key={TeamSections.PublicInfo}>
                        <TeamPublicInfo teamId={props.team.id} reload={props.reload}/>
                    </Tabs.TabPane>
                }
            </Tabs>
        </>}</BasePage>
    )
}

export default TeamPageRender;
