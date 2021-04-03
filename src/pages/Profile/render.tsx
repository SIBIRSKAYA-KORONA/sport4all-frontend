import './style.scss';
import * as React from 'react';
import { connect } from 'react-redux';

import { Avatar, Col, Row, Tabs, Tag, Typography } from 'antd';
import CONST from 'Constants';
import { ProfileSections, ProfileSettingsSections } from 'Utils/enums';
import { lettersForAvatar } from 'Utils/utils';
import BasePage from 'Components/BasePage/render';
import { RouteComponentProps } from 'react-router-dom';
import { UserAuthenticatedType, UserType } from 'Store/User/UserState';
import TeamsSubPage from 'Pages/Profile/sections/Teams/render';
import SettingsProfileSection from 'Pages/Profile/sections/Settings/render';
import TournamentsProfileSection from 'Pages/Profile/sections/Tournaments/render';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;


interface IProps extends RouteComponentProps {
    user: UserType,
    isAuthenticated: UserAuthenticatedType
}

const ProfilePage = (props:IProps):JSX.Element => {
    const paramsID = +props.match.params['id'];
    const redirect = (key:ProfileSections) => {
        props.history.push(key === ProfileSections.Settings
            ? CONST.PATHS.profile.settings.section(paramsID, ProfileSettingsSections.Personal)
            : CONST.PATHS.profile.section(paramsID, key)
        )
    };
    return (
        <BasePage {...props}>{props.user && <>
            <Row>
                <Col flex='100px'>
                    <Avatar
                        size='large'>{lettersForAvatar(props.user.name ? props.user.name + props.user.surname : props.user.nickname)}</Avatar>
                </Col>
                <Col flex='auto'>
                    <Title className='profile__name'>{props.user.name} {props.user.surname}</Title>
                    <Tag className='profile__nickname'>@{props.user.nickname}</Tag>
                    <Paragraph className='profile__about'>{props.user.about}</Paragraph>
                </Col>
            </Row>
            <Row>
                <Tabs
                    activeKey={props.match.params['section']}
                    defaultActiveKey={ProfileSections.Settings}
                    onChange={redirect}
                    className='full-width'
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
        </>}</BasePage>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
    user: state.user.user
});

export default connect(mapStateToProps)(ProfilePage);
