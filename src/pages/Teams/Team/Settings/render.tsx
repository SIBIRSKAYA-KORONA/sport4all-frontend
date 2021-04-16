import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Tabs } from 'antd';

import { Team, User } from 'Utils/types';
import { PATHS, URL_PARAMS } from 'Constants';
import { TeamSettingsSections } from 'Utils/enums';
import TeamSettingsInfoSection from 'Pages/Teams/Team/Settings/Info/render';


interface IProps extends RouteComponentProps {
    team: Team,
    user: User,
    reload: () => Promise<void>,
}

const TeamSettingsSection = (props:IProps):JSX.Element => {
    return (
        <Tabs
            tabPosition='left'
            activeKey={props.match.params[URL_PARAMS.team.settingsSection]}
            defaultActiveKey={TeamSettingsSections.Info}
            onChange={(key:TeamSettingsSections) => {
                props.history.push(PATHS.teams.settings.section(props.team.id, key))
            }}
        >
            <Tabs.TabPane tab='Информация' key={TeamSettingsSections.Info}>
                <TeamSettingsInfoSection user={props.user} team={props.team} reload={props.reload}/>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Приглашения' key={TeamSettingsSections.Invites}>
                <></>
            </Tabs.TabPane>
        </Tabs>
    );
};

export default TeamSettingsSection;
