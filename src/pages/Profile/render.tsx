import './style.scss';
import * as React from 'react';
import { connect } from 'react-redux';

import { Avatar, Col, message, Row, Tabs, Tag, Typography } from 'antd';

import store from 'Store/store';
import { User } from 'Utils/types';
import UserModel from 'Models/UserModel';
import { PATHS, URL_PARAMS } from 'Constants';
import BasePage from 'Components/BasePage/render';
import { RouteComponentProps } from 'react-router-dom';
import { lettersForUserAvatar } from 'Utils/structUtils';
import { addRecentUser } from 'Store/Recent/RecentActions';
import TeamsSubPage from 'Pages/Profile/sections/Teams/render';
import HistorySubPage from 'Pages/Profile/sections/History/render';
import { UserAuthenticatedType, UserType } from 'Store/User/UserState';
import { ProfileSections, ProfilePersonalSections } from 'Utils/enums';
import PersonalProfileSection from 'Pages/Profile/sections/Personal/render';
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

    function isCurrentUserProfile():boolean {
        return props.user && props.user.nickname === props.match.params[URL_PARAMS.profile.nickname];
    }

    async function reload() {
        if (isCurrentUserProfile()) {
            setProfile(props.user);
            setCanEdit(true);
        } else {
            UserModel.getProfileByNickname(props.match.params[URL_PARAMS.profile.nickname])
                .then((profile:User) => {
                    if (props.user && props.user.id === profile.id) setCanEdit(true);
                    else store.dispatch(addRecentUser(profile));
                    setProfile(profile);
                })
                .catch(e => message.error(e));
        }
    }

    React.useEffect(() => {
        setLoading(true)
        reload().finally(() => setLoading(false));
    }, [props.match.params[URL_PARAMS.profile.nickname]]);

    React.useEffect(() => {
        if (isCurrentUserProfile()) {
            setProfile(props.user);
            setCanEdit(true);
        }
    }, [props.user]);

    function redirect(key:ProfileSections) {
        props.history.push(key === ProfileSections.Personal
            ? PATHS.profile.personal.section(profile.nickname, ProfilePersonalSections.Skills)
            : PATHS.profile.section(profile.nickname, key)
        )
    }

    return (<BasePage {...props} loading={loading}>{profile && <>
        <Row>
            <Col flex='100px'>
                <Avatar size='large' src={profile.avatar?.url}>{lettersForUserAvatar(profile)}</Avatar>
            </Col>
            <Col flex='auto'>
                <Title className='profile__name'>{profile.name} {profile.surname}</Title>
                <Tag className='profile__nickname'>@{profile.nickname}</Tag>
                <Paragraph className='profile__about'>{profile.about}</Paragraph>
            </Col>
        </Row>
        <Row>
            <Tabs
                activeKey={props.match.params[URL_PARAMS.profile.section]}
                defaultActiveKey={ProfileSections.History}
                onChange={redirect}
                className='full-width'
            >
                <TabPane tab='История' key={ProfileSections.History}>
                    <HistorySubPage profile={profile} {...props}/>
                </TabPane>
                <TabPane tab='Команды' key={ProfileSections.Teams}>
                    <TeamsSubPage profile={profile} {...props}/>
                </TabPane>
                <TabPane tab='Турниры' key={ProfileSections.Tournaments}>
                    <TournamentsProfileSection profile={profile} {...props}/>
                </TabPane>
                <TabPane tab='Личное' key={ProfileSections.Personal}>
                    <PersonalProfileSection profile={profile} {...props}/>
                </TabPane>
            </Tabs>
        </Row>
    </>}</BasePage>);
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
    user: state.user.user
});

export default connect(mapStateToProps, { addRecentUser })(ProfilePage);
