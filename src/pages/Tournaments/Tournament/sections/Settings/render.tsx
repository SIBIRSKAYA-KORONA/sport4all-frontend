import * as React from 'react';
import { Tabs } from 'antd'

import { EventStatus, Tournament } from 'Utils/types';
import PublicInfoLogic from 'Pages/Tournaments/Tournament/sections/Settings/PublicInfo/logic';
import ParticipantsLogic from 'Pages/Tournaments/Tournament/sections/Settings/Participants/logic';
import TournamentInvites from 'Pages/Tournaments/Tournament/sections/Settings/Invites/render';
import { RouteComponentProps } from 'react-router-dom';


interface IProps extends RouteComponentProps {
    tournamentData: Tournament,
    setTournamentData: (t:Tournament) => void
}

function TournamentSettingsRender(props:IProps):JSX.Element {
    return (
        <Tabs tabPosition={'left'}>
            <Tabs.TabPane tab={'Публичная информация'} key={'1'}>
                <PublicInfoLogic
                    tournamentData={props.tournamentData}
                    setTournamentData={props.setTournamentData}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab={'Участники'} key={'2'}>
                <ParticipantsLogic {...props}
                    tournamentData={props.tournamentData}
                    setTournamentData={props.setTournamentData}
                />
            </Tabs.TabPane>
            {props.tournamentData.status === EventStatus.RegistrationEvent &&
                <Tabs.TabPane tab={'Приглашения'} key={'3'}>
                    <TournamentInvites {...props} tournament={props.tournamentData}/>
                </Tabs.TabPane>
            }
        </Tabs>
    )
}

export default TournamentSettingsRender;
