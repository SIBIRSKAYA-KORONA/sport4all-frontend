import * as React from 'react';
import {Row, Tabs} from 'antd'
import PropTypes from 'prop-types'
import ParticipantsSubsection from 'Pages/Tournaments/Tournament/sections/Settings/ParticipantsSubsection';
import PublicInfoSubsection from 'Pages/Tournaments/Tournament/sections/Settings/PublicInfoSubsection';
function TournamentSettingsRender(props) {
    return (
        <Row>
            <Tabs tabPosition={'left'} tabBarStyle={{paddingLeft: 0}}>
                <Tabs.TabPane tab={'Публичная информация'} key={'1'}>
                    {/*TODO: add api call*/}
                    <PublicInfoSubsection/>
                </Tabs.TabPane>
                <Tabs.TabPane tab={'Участники'} key={'2'}>
                    <ParticipantsSubsection tournamentId={props.tournamentId} teams={props.teams}/>
                </Tabs.TabPane>
                <Tabs.TabPane tab={'Встречи'} key={'3'}>
                    СЕТКА СО ВСТРЕЧАМИ
                </Tabs.TabPane>
            </Tabs>
        </Row>


    )
}

TournamentSettingsRender.propTypes = {
    tournamentId: PropTypes.number.isRequired,
    teams: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default TournamentSettingsRender;
