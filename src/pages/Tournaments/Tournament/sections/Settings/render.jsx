import * as React from 'react';
import {Tabs} from 'antd'
import PropTypes from 'prop-types'
import ParticipantsLogic from 'Pages/Tournaments/Tournament/sections/Settings/Participants/logic';
import PublicInfoLogic from 'Pages/Tournaments/Tournament/sections/Settings/PublicInfo/logic';

function TournamentSettingsRender(props) {
    return (

        <Tabs tabPosition={'left'}>
            <Tabs.TabPane tab={'Публичная информация'} key={'1'}>
                <PublicInfoLogic
                    tournamentData={props.tournamentData}
                    setTournamentData={props.setTournamentData}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab={'Участники'} key={'2'}>
                <ParticipantsLogic
                    tournamentData={props.tournamentData}
                    setTournamentData={props.setTournamentData}
                />
            </Tabs.TabPane>
            {/*<Tabs.TabPane tab={'Встречи'} key={'3'}>*/}
            {/*    СЕТКА СО ВСТРЕЧАМИ*/}
            {/*</Tabs.TabPane>*/}
        </Tabs>


    )
}

TournamentSettingsRender.propTypes = {
    tournamentData: PropTypes.object,
    setTournamentData: PropTypes.func
}

export default TournamentSettingsRender;
