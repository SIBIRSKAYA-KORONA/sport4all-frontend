import './style.scss';
import * as React from 'react';

import { Avatar, Col, Row, Tabs, Typography } from 'antd';
const { Title, Paragraph } = Typography;

import { Team, User } from 'Utils/types';
import BasePage from 'Components/BasePage/render';
import { RouteComponentProps } from 'react-router-dom';
import { lettersForAvatar } from 'Utils/utils';
import { TeamSections } from 'Utils/enums';
import TeamPlayers from 'Pages/Teams/Team/Components/Players';

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
                    <Avatar size='large'>{lettersForAvatar(props.team.name)}</Avatar>
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
            </Tabs>
        </>}</BasePage>
    )
}

export default TeamPageRender;
