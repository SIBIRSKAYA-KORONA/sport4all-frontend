import * as React from 'react';
import BasePage from 'Components/BasePage/render';
import {Avatar, Row, Skeleton, Space, Spin, Tabs, Typography} from 'antd'
import TournamentGridRender from 'Pages/Tournaments/Tournament/sections/Grid/render';
import TournamentTableRender from 'Pages/Tournaments/Tournament/sections/Table/render';
import TournamentHistoryRender from 'Pages/Tournaments/Tournament/sections/History/render';
import TournamentSettingsRender from 'Pages/Tournaments/Tournament/sections/Settings/render';
import PropTypes from 'prop-types'

const {Title, Paragraph} = Typography;


const renderLoading = (props) => {
    return (
        <BasePage>
            <Row style={{marginBottom: 8}}>
                <Space size='small' align='center'>
                    <Skeleton active avatar={{size: 64}} paragraph={{rows: 0}} title={false}/>
                    <Skeleton.Button active size={46} style={{width: 200}}/>
                </Space>
            </Row>

            <Row>
                <Skeleton title={false}/>
            </Row>

            <Tabs tabBarStyle={{marginBottom: 32}} defaultActiveKey={props.section} onChange={props.onSectionChange}>
                <Tabs.TabPane tab={'Сетка'} key={TournamentPageRender.sections[0]}>
                    <Spin/>
                </Tabs.TabPane>
                <Tabs.TabPane tab={'Таблица'} key={TournamentPageRender.sections[1]}>
                    <Spin/>
                </Tabs.TabPane>
                <Tabs.TabPane tab={'История'} key={TournamentPageRender.sections[2]}>
                    <Spin/>
                </Tabs.TabPane>
                <Tabs.TabPane tab={'Настройки'} key={TournamentPageRender.sections[3]}>
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
                <Space size='large' align='center'>
                    <Avatar size={64}/>
                    <Title style={{marginBottom: 0}}>{props.tournamentData.name || ''}</Title>
                </Space>
            </Row>

            <Row>
                <Paragraph>
                    {props?.tournamentData?.about || ''}
                </Paragraph>
            </Row>

            <Tabs tabBarStyle={{marginBottom: 32}} defaultActiveKey={props.section} onChange={props.onSectionChange}>
                <Tabs.TabPane tab={'Сетка'} key={TournamentPageRender.sections[0]}>
                    <TournamentGridRender/>
                </Tabs.TabPane>
                <Tabs.TabPane tab={'Таблица'} key={TournamentPageRender.sections[1]}>
                    <TournamentTableRender/>
                </Tabs.TabPane>
                <Tabs.TabPane tab={'История'} key={TournamentPageRender.sections[2]}>
                    <TournamentHistoryRender/>
                </Tabs.TabPane>
                <Tabs.TabPane tab={'Настройки'} key={TournamentPageRender.sections[3]}>
                    <TournamentSettingsRender
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
        return renderLoading(props);
    }
    return renderLoaded(props);
}

TournamentPageRender.propTypes = {
    section: PropTypes.string.isRequired,
    onSectionChange: PropTypes.func.isRequired,
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

TournamentPageRender.sections = ['grid', 'table', 'history', 'settings']

export default TournamentPageRender;
