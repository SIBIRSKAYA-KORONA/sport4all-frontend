import * as React from 'react';
import {useEffect, useState} from 'react';
import BasePage from 'Components/BasePage/render';
import {Avatar, Row, Space, Tabs, Typography} from 'antd'
import TournamentGridRender from 'Pages/Tournaments/Tournaments/sections/Grid/render';
import TournamentTableRender from 'Pages/Tournaments/Tournaments/sections/Table/render';
import TournamentHistoryRender from 'Pages/Tournaments/Tournaments/sections/History/render';
import TournamentSettingsRender from 'Pages/Tournaments/Tournaments/sections/Settings/render';
import TournamentModel from 'Models/TournamentModel';
import PropTypes from 'prop-types'

const {Title, Paragraph} = Typography;

function TournamentPageRender(props) {
    const [tournamentData, setTournamentData] = useState({});
    const tournamentId = props.tournamentId;
    useEffect(async () => {
        const gotTournamentData = await TournamentModel.getTournament(tournamentId);
        const gotTeams = await TournamentModel.getTeams(tournamentId);
        console.log(gotTournamentData);
        console.log(gotTeams);
        setTournamentData({...gotTournamentData, teams: gotTeams});
    }, [])

    return (
        <BasePage {...props}>
            <Row style={{marginBottom: 8}}>
                <Space size="large" align="center">
                    <Avatar size={64}/>
                    <Title style={{marginBottom: 0}}>{tournamentData.name || ''}</Title>
                </Space>
            </Row>

            <Row>
                <Paragraph>
                    In the process of internal desktop applications development, many different design specs and
                    implementations would be involved, which might cause designers and developers difficulties and
                    duplication and reduce the efficiency of development.
                </Paragraph>
            </Row>

            <Tabs>
                <Tabs.TabPane tab="Сетка" key="1">
                    <TournamentGridRender/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Таблица" key="2">
                    <TournamentTableRender/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="История" key="3">
                    <TournamentHistoryRender/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Настройки" key="4">
                    <TournamentSettingsRender
                        tournamentId={tournamentId}
                        teams={tournamentData.teams || []}/>
                </Tabs.TabPane>
            </Tabs>

        </BasePage>
    )
}

TournamentPageRender.propTypes = {
    tournamentId: PropTypes.number.isRequired
}

export default TournamentPageRender;
