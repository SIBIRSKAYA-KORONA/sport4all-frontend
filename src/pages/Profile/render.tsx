import './style.scss';
import * as React from 'react';
import { connect } from 'react-redux';

import { Avatar, Col, message, Row, Tabs, Tag, Typography } from 'antd';

import CONST from 'Constants';
import { User } from 'Utils/types';
import UserModel from 'Models/UserModel';
import BasePage from 'Components/BasePage/render';
import { RouteComponentProps } from 'react-router-dom';
import { lettersForUserAvatar } from 'Utils/structUtils';
import TeamsSubPage from 'Pages/Profile/sections/Teams/render';
import { UserAuthenticatedType, UserType } from 'Store/User/UserState';
import { ProfileSections, ProfileSettingsSections } from 'Utils/enums';
import SettingsProfileSection from 'Pages/Profile/sections/Settings/render';
import TournamentsProfileSection from 'Pages/Profile/sections/Tournaments/render';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;


interface IProps extends RouteComponentProps {
    user: UserType,
    isAuthenticated: UserAuthenticatedType
}

const ProfilePage = (props:IProps):JSX.Element => {
    const [profile, setProfile] = React.useState<User|null>(null);
    const [canEdit, setCanEdit] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        UserModel.getProfileByNickname(props.match.params['nickname'])
            .then((profile:User) => {
                if (props.user && props.user.id === profile.id) setCanEdit(true);
                setProfile(profile);
            })
            .catch(e => message.error(e))
            .finally(() => setLoading(false));
    }, []);

    const redirect = (key:ProfileSections) => {
        props.history.push(key === ProfileSections.Settings
            ? CONST.PATHS.profile.settings.section(profile.nickname, ProfileSettingsSections.Skills)
            : CONST.PATHS.profile.section(profile.nickname, key)
        )
    };
    return (
        <BasePage {...props} loading={loading}>{profile && <>
            <Row>
                <Col flex='100px'>
                    <Avatar size='large'>{lettersForUserAvatar(profile)}</Avatar>
                </Col>
                <Col flex='auto'>
                    <Title className='profile__name'>{profile.name} {profile.surname}</Title>
                    <Tag className='profile__nickname'>@{profile.nickname}</Tag>
                    <Paragraph className='profile__about'>{profile.about}</Paragraph>
                </Col>
            </Row>
            <Row>
                <Tabs
                    activeKey={props.match.params['section']}
                    defaultActiveKey={ProfileSections.Tournaments}
                    onChange={redirect}
                    className='full-width'
                >
                    {canEdit &&
                        <TabPane tab='Команды' key={ProfileSections.Teams}>
                            <TeamsSubPage {...props}/>
                        </TabPane>
                    }
                    <TabPane tab='Турниры' key={ProfileSections.Tournaments}>
                        <TournamentsProfileSection profile={profile} {...props}/>
                    </TabPane>
                    <TabPane tab='Настройки' key={ProfileSections.Settings}>
                        <SettingsProfileSection profile={profile} {...props}/>
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
