import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Tabs } from 'antd';

import CONST from 'Constants';
import { User } from 'Utils/types';
import { ProfilePersonalSections } from 'Utils/enums';
import ProfilePersonalSkills from 'Pages/Profile/sections/Personal/sections/Skills/render';
import ProfilePersonalActions from 'Pages/Profile/sections/Personal/sections/Actions/render';
import ProfilePersonalInfo from 'Pages/Profile/sections/Personal/sections/PersonalInfo/render';
import ProfilePersonalInvites from 'Pages/Profile/sections/Personal/sections/Invites/render';


interface IProps extends RouteComponentProps {
    user: User,
    profile: User
}

const PersonalProfileSection = (props:IProps):JSX.Element => {
    const canEdit = props.user.id === props.profile.id;
    return (
        <Tabs
            tabPosition='left'
            activeKey={props.match.params['settingsSection']}
            defaultActiveKey={ProfilePersonalSections.Skills}
            onChange={(key) => {
                props.history.push(CONST.PATHS.profile.personal.section(props.profile.nickname, key as ProfilePersonalSections))
            }}
        >
            <Tabs.TabPane tab='Навыки' key={ProfilePersonalSections.Skills}>
                <ProfilePersonalSkills canEdit={canEdit} {...props}/>
            </Tabs.TabPane>
            {canEdit && <>
                <Tabs.TabPane tab='Приглашения' key={ProfilePersonalSections.Invites}>
                    <ProfilePersonalInvites {...props}/>
                </Tabs.TabPane>
                <Tabs.TabPane tab='Информация' key={ProfilePersonalSections.Information}>
                    <ProfilePersonalInfo user={props.user}/>
                </Tabs.TabPane>
                <Tabs.TabPane tab='Действия' key={ProfilePersonalSections.Actions}>
                    <ProfilePersonalActions {...props}/>
                </Tabs.TabPane>
            </>}
        </Tabs>
    );
};

export default PersonalProfileSection;
