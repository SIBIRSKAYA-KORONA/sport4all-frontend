import * as React from 'react';
import { Tabs } from 'antd'

import { EventStatus, Tournament } from 'Utils/types';
import PublicInfoLogic from 'Pages/Tournaments/Tournament/sections/Settings/PublicInfo/logic';
import ParticipantsLogic from 'Pages/Tournaments/Tournament/sections/Settings/Participants/logic';
import TournamentInvites from 'Pages/Tournaments/Tournament/sections/Settings/Invites/render';
import { RouteComponentProps } from 'react-router-dom';
import { TournamentSettingsSection } from 'Utils/enums';
import { PATHS, URL_PARAMS } from 'Constants';


interface IProps extends RouteComponentProps {
    tournamentData: Tournament,
    setTournamentData: (t:Tournament) => void,
    isOwner: boolean
}

function TournamentSettingsRender(props:IProps):JSX.Element {
    return (
        <Tabs
            tabPosition={'left'}
            activeKey={props.match.params[URL_PARAMS.tournament.settingsSection]}
            defaultActiveKey={TournamentSettingsSection.Info}
            onChange={(key:TournamentSettingsSection) => {
                props.history.push(PATHS.tournaments.settings.section(props.tournamentData.id, key));
            }}
        >
            <Tabs.TabPane tab={'Публичная информация'} key={TournamentSettingsSection.Info}>
                <PublicInfoLogic
                    tournamentData={props.tournamentData}
                    setTournamentData={props.setTournamentData}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab={'Участники'} key={TournamentSettingsSection.Members}>
                <ParticipantsLogic {...props}
                    tournamentData={props.tournamentData}
                    setTournamentData={props.setTournamentData}
                />
            </Tabs.TabPane>
            {props.isOwner && props.tournamentData.status === EventStatus.RegistrationEvent &&
                <Tabs.TabPane tab={'Приглашения'} key={TournamentSettingsSection.Invites}>
                    <TournamentInvites {...props} tournament={props.tournamentData}/>
                </Tabs.TabPane>
            }
        </Tabs>
    )
}

export default TournamentSettingsRender;
