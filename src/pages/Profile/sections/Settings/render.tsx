import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Tabs } from 'antd';

import { User } from 'Utils/types';
import { ProfileSettingsSections } from 'Utils/enums';
import ProfileSettingsPersonal from 'Pages/Profile/sections/Settings/sections/PersonalInfo/render';
import ProfileSettingsActions from 'Pages/Profile/sections/Settings/sections/Actions/render';
import CONST from 'Constants';


interface IProps extends RouteComponentProps {
    user: User
}

const SettingsProfileSection = (props:IProps):JSX.Element => {
    return (
        <Tabs
            tabPosition='left'
            activeKey={props.match.params['settingsSection']}
            defaultActiveKey={ProfileSettingsSections.Personal}
            onChange={(key) => { props.history.push(CONST.PATHS.profile.settings.section(key as ProfileSettingsSections)) }}
        >
            <Tabs.TabPane tab='Личная информация' key={ProfileSettingsSections.Personal}>
                <ProfileSettingsPersonal user={props.user}/>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Действия' key={ProfileSettingsSections.Actions}>
                <ProfileSettingsActions {...props}/>
            </Tabs.TabPane>
        </Tabs>
    );
};

export default SettingsProfileSection;
