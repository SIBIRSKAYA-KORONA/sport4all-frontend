import * as React from 'react';
import { connect } from 'react-redux';
import './style.scss';

import {Avatar, Col, Row, Tabs, Typography} from 'antd';

import JSIcon from 'Static/icons/js.svg';
import BasePage from 'Components/BasePage/render';
import TeamsSubPage from 'Pages/Profile/sections/Teams/render';
import {RouteComponentProps} from 'react-router-dom';
import {User} from 'Utils/types';
import {UserAuthenticatedType} from 'Store/User/UserState';
import TournamentsProfileSection from 'Pages/Profile/sections/Tournaments/render';
import SettingsProfileSection from 'Pages/Profile/sections/Settings/render';
import { ProfileSections } from 'Utils/enums';
import CONST from 'Constants';

const {Title, Paragraph} = Typography;
const {TabPane} = Tabs;

interface IProps extends RouteComponentProps {
    user: User,
    isAuthenticated: UserAuthenticatedType
}

const ProfilePageRender = (props:IProps):JSX.Element => (
    <BasePage {...props}>
        {props.user &&
            <Row>
                <Col flex='100px'>
                    <Avatar size='large' icon={<img src={JSIcon}  alt={JSIcon}/>}/>
                </Col>
                <Col flex='auto'>
                    <Title className='profile__name'>{props.user.name} {props.user.surname}</Title>
                    <p className='profile__nickname'>@{props.user.nickname}</p>
                    <Paragraph className='profile__about'>{props.user.about}</Paragraph>
                </Col>
            </Row>
        }
        <Row>
            <Tabs
                activeKey={props.match.params['section']}
                defaultActiveKey={ProfileSections.Settings}
                onChange={(key) => { props.history.push(CONST.PATHS.profile.section(key as ProfileSections)) }}
            >
                <TabPane tab='Команды' key={ProfileSections.Teams}>
                    <TeamsSubPage {...props}/>
                </TabPane>
                <TabPane tab='Турниры' key={ProfileSections.Tournaments}>
                    <TournamentsProfileSection {...props}/>
                </TabPane>
                <TabPane tab='Настройки' key={ProfileSections.Settings}>
                    <SettingsProfileSection {...props}/>
                </TabPane>
            </Tabs>
        </Row>
    </BasePage>
);

const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps)(ProfilePageRender);
