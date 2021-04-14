import * as React from 'react';
import BasePage from 'Components/BasePage/render';
import {Avatar, Row, Skeleton, Space, Spin, Tabs, Typography} from 'antd'
import TournamentGridRender from 'Pages/Tournaments/Tournament/sections/Grid/render';
{/*TODO: add table*/}
// import TournamentTableRender from 'Pages/Tournaments/Tournament/sections/Table/render';
{/*TODO: add history*/}
// import TournamentHistoryRender from 'Pages/Tournaments/Tournament/sections/History/render';
import TournamentSettingsRender from 'Pages/Tournaments/Tournament/sections/Settings/render';
import PropTypes from 'prop-types'

const {Title, Paragraph} = Typography;


function TournamentPageRender(props) {
    return (
        <BasePage {...props}>
            <Row style={{marginBottom: 8}}>
                <Space size='large' align='center'>
                    {props.isLoading ?
                        <>
                            <Skeleton active avatar={{size: 64}} paragraph={{rows: 0}} title={false}/>
                            <Skeleton.Button active size={46} style={{width: 200}}/>
                        </> :
                        <>
                            <Avatar size={64} src={props.tournamentData.avatar.url}/>
                            <Title style={{marginBottom: 0}}>{props.tournamentData.name || ''}</Title>
                        </>
                    }
                </Space>
            </Row>

            {props.isLoading ?
                <Skeleton title={false}/> :
                <Typography>
                    <Paragraph>
                        Место проведения: {props.tournamentData.location}
                    </Paragraph>
                    <Paragraph>
                        {props.tournamentData.about || ''}
                    </Paragraph>
                </Typography>
            }

            <Tabs tabBarStyle={{marginBottom: 32}}>
                <Tabs.TabPane tab={'Сетка'} key={TournamentPageRender.sections[0]}>
                    {props.isLoading ? <Spin/> : <TournamentGridRender
                        history={props.history}
                        tournamentData={props.tournamentData}
                    />}
                </Tabs.TabPane>

                {/*TODO: add table*/}
                {/*<Tabs.TabPane tab={'Таблица'} key={TournamentPageRender.sections[1]}>*/}
                {/*    {props.isLoading ? <Spin/> : <TournamentTableRender tournamentData={props.tournamentData}/>}*/}
                {/*</Tabs.TabPane>*/}
                {/*TODO: add history*/}
                {/*<Tabs.TabPane tab={'История'} key={TournamentPageRender.sections[2]}>*/}
                {/*    {props.isLoading ? <Spin/> : <TournamentHistoryRender/>}*/}
                {/*</Tabs.TabPane>*/}
                {props.isOwner ?
                    <Tabs.TabPane tab={'Настройки'} key={TournamentPageRender.sections[3]}>
                        {props.isLoading ? <Spin/> :
                            <TournamentSettingsRender {...props}
                                isOwner={props.isOwner}
                                tournamentData={props.tournamentData}
                                setTournamentData={props.setTournamentData}
                            />}
                    </Tabs.TabPane>
                    : null
                }
            </Tabs>

        </BasePage>
    )
}

TournamentPageRender.propTypes = {
    history: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isOwner: PropTypes.bool.isRequired,
    tournamentData: PropTypes.object.isRequired,
    setTournamentData: PropTypes.func.isRequired,
}

TournamentPageRender.sections = ['grid', 'table', 'history', 'settings']

export default TournamentPageRender;
