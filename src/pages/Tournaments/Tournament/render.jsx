import * as React from 'react';
import BasePage from 'Components/BasePage/render';
import {Avatar, Row, Space, Tabs, Typography, Skeleton, Spin} from 'antd'
import TournamentGridRender from 'Pages/Tournaments/Tournament/sections/Grid/render';
import TournamentTableRender from 'Pages/Tournaments/Tournament/sections/Table/render';
import TournamentHistoryRender from 'Pages/Tournaments/Tournament/sections/History/render';
import TournamentSettingsRender from 'Pages/Tournaments/Tournament/sections/Settings/render';
import PropTypes from 'prop-types'

const {Title, Paragraph} = Typography;

const renderLoading = () => {
    return (
        <BasePage>
            <Row style={{marginBottom: 8}}>
                <Space size="small" align="center">
                    <Skeleton active avatar={{size: 64}} paragraph={{ rows: 0 }} title={false}/>
                    <Skeleton.Button active size={46} style={{ width: 200 }}/>
                </Space>
            </Row>

            <Row>
                <Skeleton title={false}/>
            </Row>

            <Tabs tabBarStyle={{marginBottom: 32}}>
                <Tabs.TabPane tab="Сетка" key="1">
                    <Spin/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Таблица" key="2">
                    <Spin/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="История" key="3">
                    <Spin/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Настройки" key="4">
                    <Spin/>
                </Tabs.TabPane>
            </Tabs>
        </BasePage>
    )
}

const renderLoaded = (props) => {
    return (
        <BasePage>
            <Row style={{marginBottom: 8}}>
                <Space size="large" align="center">
                    <Avatar size={64}/>
                    <Title style={{marginBottom: 0}}>{props.tournamentData.name || ''}</Title>
                </Space>
            </Row>

            <Row>
                <Paragraph>
                    {props?.tournamentData?.about || ''}
                </Paragraph>
            </Row>

            <Tabs tabBarStyle={{marginBottom: 32}}>
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
                    < TournamentSettingsRender
                        tournamentId={props.tournamentData.id}
                        teams={props.tournamentData.teams || []}/>
                </Tabs.TabPane>
            </Tabs>

        </BasePage>
    )
}

function TournamentPageRender(props) {
    const isLoading = props.tournamentData === undefined;

    if (isLoading) {
        return renderLoading();
    }
    return renderLoaded(props);
}

TournamentPageRender.propTypes = {
    tournamentData: PropTypes.shape(
        {
            id: PropTypes.number,
            name: PropTypes.string,
            about: PropTypes.string,
            system: PropTypes.string,
            location: PropTypes.string,
            ownerId: PropTypes.number,
            teams: PropTypes.array,
        }
    )
}

export default TournamentPageRender;
