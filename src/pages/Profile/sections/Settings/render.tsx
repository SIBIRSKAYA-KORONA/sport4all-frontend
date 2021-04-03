import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Tabs } from 'antd';

import CONST from 'Constants';
import { User } from 'Utils/types';
import { ProfileSettingsSections } from 'Utils/enums';
import ProfileSettingsSkills from 'Pages/Profile/sections/Settings/sections/Skills/render';
import ProfileSettingsActions from 'Pages/Profile/sections/Settings/sections/Actions/render';
import ProfileSettingsPersonal from 'Pages/Profile/sections/Settings/sections/PersonalInfo/render';


interface IProps extends RouteComponentProps {
    user: User,
    profile: User
}

const SettingsProfileSection = (props:IProps):JSX.Element => {
    const canEdit = props.user.id === props.profile.id;
    return (
        <Tabs
            tabPosition='left'
            activeKey={props.match.params['settingsSection']}
            defaultActiveKey={ProfileSettingsSections.Skills}
            onChange={(key) => {
                props.history.push(CONST.PATHS.profile.settings.section(props.profile.nickname, key as ProfileSettingsSections))
            }}
        >
            {canEdit &&
                <Tabs.TabPane tab='Личная информация' key={ProfileSettingsSections.Personal}>
                    <ProfileSettingsPersonal user={props.user}/>
                </Tabs.TabPane>
            }
            <Tabs.TabPane tab='Навыки' key={ProfileSettingsSections.Skills}>
                <ProfileSettingsSkills canEdit={canEdit} profile={props.profile} {...props}/>
            </Tabs.TabPane>
            {canEdit &&
                <Tabs.TabPane tab='Действия' key={ProfileSettingsSections.Actions}>
                    <ProfileSettingsActions {...props}/>
                </Tabs.TabPane>
            }
        </Tabs>
    );
};

export default SettingsProfileSection;
