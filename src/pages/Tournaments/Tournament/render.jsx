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
import {PATHS, URL_PARAMS} from 'Constants';
import PinIcon from 'Static/icons/pin.svg';

import './style.scss'

const {Title} = Typography;


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
                <div className={'tournament__info_block'}>
                    { props.tournamentData.location &&
                        <div className={'tournament__info_row'}>
                            <img className={'tournament__info_icon'} src={PinIcon} alt={'Location icon'}/>
                            <span>{props.tournamentData.location}</span>
                        </div>
                    }

                    <div className={'tournament__info_row'}>
                        <span>{props.tournamentData.about || ''}</span>
                    </div>
                </div>
            }

            <Tabs
                tabBarStyle={{marginBottom: 32}}
                activeKey={props.match.params[URL_PARAMS.tournament.section]}
                defaultActiveKey='grid'
                onChange={(key) => {
                    props.history.push(PATHS.tournaments.section(props.tournamentData.id, key))
                }}
            >
                <Tabs.TabPane tab={'Сетка'} key='grid'>
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
                    <Tabs.TabPane tab={'Настройки'} key='settings'>
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
    match: PropTypes.object.isRequired,
}

export default TournamentPageRender;
