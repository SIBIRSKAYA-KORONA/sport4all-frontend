import * as React from 'react';
import BasePage from 'Components/BasePage/render';
import {Avatar, Row, Skeleton, Space, Spin, Tabs, Typography} from 'antd'
import TournamentGridRender from 'Pages/Tournaments/Tournament/sections/Grid/render';
import TournamentTableRender from 'Pages/Tournaments/Tournament/sections/Table/render';
import TournamentHistoryRender from 'Pages/Tournaments/Tournament/sections/History/render';
import TournamentSettingsRender from 'Pages/Tournaments/Tournament/sections/Settings/render';
import PropTypes from 'prop-types'

const {Title, Paragraph} = Typography;


function TournamentPageRender(props) {
    const isLoading = props.tournamentData === undefined;

    return (
        <BasePage>
            <Row style={{marginBottom: 8}}>
                <Space size='large' align='center'>
                    {isLoading ?
                        <>
                            <Skeleton active avatar={{size: 64}} paragraph={{rows: 0}} title={false}/>
                            <Skeleton.Button active size={46} style={{width: 200}}/>
                        </> :
                        <>
                            <Avatar size={64}/>
                            <Title style={{marginBottom: 0}}>{props.tournamentData.name || ''}</Title>
                        </>
                    }
                </Space>
            </Row>

            {isLoading ?
                <Skeleton title={false}/> :
                <Typography>
                    <Paragraph>
                        Место проведения: {props?.tournamentData?.location}
                    </Paragraph>
                    <Paragraph>
                        {props?.tournamentData?.about || ''}
                    </Paragraph>
                </Typography>
            }

            <Tabs tabBarStyle={{marginBottom: 32}} defaultActiveKey={props.section} onChange={props.onSectionChange}>
                <Tabs.TabPane tab={'Сетка'} key={TournamentPageRender.sections[0]}>
                    {isLoading ? <Spin/> : <TournamentGridRender/>}
                </Tabs.TabPane>
                <Tabs.TabPane tab={'Таблица'} key={TournamentPageRender.sections[1]}>
                    {isLoading ? <Spin/> : <TournamentTableRender/>}
                </Tabs.TabPane>
                <Tabs.TabPane tab={'История'} key={TournamentPageRender.sections[2]}>
                    {isLoading ? <Spin/> : <TournamentHistoryRender/>}
                </Tabs.TabPane>
                <Tabs.TabPane tab={'Настройки'} key={TournamentPageRender.sections[3]}>
                    {isLoading ? <Spin/> :
                        <TournamentSettingsRender
                            tournamentId={props.tournamentData.id}
                            teams={props.tournamentData.teams || []}/>}
                </Tabs.TabPane>
            </Tabs>

        </BasePage>
    )
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
