import * as React from 'react';
import {Row, Tabs} from 'antd'
import PropTypes from 'prop-types'
import ParticipantsLogic from 'Pages/Tournaments/Tournament/sections/Settings/Participants/logic';
import PublicInfoLogic from 'Pages/Tournaments/Tournament/sections/Settings/PublicInfo/logic';

function TournamentSettingsRender(props) {
    return (

        <Tabs tabPosition={'left'}>
            <Tabs.TabPane tab={'Публичная информация'} key={'1'}>
                <PublicInfoLogic tournamentId={props.tournamentId}/>
            </Tabs.TabPane>
            <Tabs.TabPane tab={'Участники'} key={'2'}>
                <ParticipantsLogic tournamentId={props.tournamentId} teams={props.teams}/>
            </Tabs.TabPane>
            <Tabs.TabPane tab={'Встречи'} key={'3'}>
                СЕТКА СО ВСТРЕЧАМИ
            </Tabs.TabPane>
        </Tabs>


    )
}

TournamentSettingsRender.propTypes = {
    tournamentId: PropTypes.number.isRequired,
    teams: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default TournamentSettingsRender;
