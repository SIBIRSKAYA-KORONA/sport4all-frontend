import './style.scss';
import * as React from 'react';

import { Button, Empty, Space, Typography } from 'antd';
import { PATHS } from 'Constants';
import { EventStatus, Stats } from 'Utils/types';
import { meetingResult } from 'Utils/structUtils';
import BasePage from 'Components/BasePage/render';
import AddTeamsModal from 'Pages/Meeting/modals/addTeams';
import MeetingSteps from 'Components/Meeting/Steps/render';
import AddResultsModal from 'Pages/Meeting/modals/addResults';
import MeetingResult from 'Pages/Meeting/Components/Result/render';
import MeetingStatusTag from 'Components/Meeting/StatusTag/render';
import MeetingPictureWall from 'Pages/Meeting/Components/PictureWall';
import { IProps, visibleModals, visibleModalsKey } from './interface';
import MeetingTeamScore from 'Pages/Meeting/Components/TeamInTop/render';

import EditIcon from 'Static/icons/edit.svg';
import TeamScores from 'Pages/Meeting/Components/ScoresGroup/render';

const { Title } = Typography;


const MeetingPageRender = (props:IProps):JSX.Element => {
    const [isModalVisible, setIsModalVisible] = React.useState({} as visibleModals);

    const showModal = (key:visibleModalsKey) => setIsModalVisible(prev => ({ ...prev, [key]:true }));
    const handleOk = (key:visibleModalsKey) => setIsModalVisible(prev => ({ ...prev, [key]:false }));
    const handleCancel = (key:visibleModalsKey) => setIsModalVisible(prev => ({ ...prev, [key]:false }));

    const [statsPerTeam, setStatsPerTeam] = React.useState<Stats[][]>([]);
    React.useEffect(() => {
        if (props.meeting?.teams.length !== 2) return;
        const statsPerTeam:Stats[][] = [];
        props.meeting.teams.forEach(t => {
            statsPerTeam.push(props.stats.filter(s => s.teamId === t.id));
        });
        setStatsPerTeam(statsPerTeam);
    }, [props.stats]);

    return (
        <BasePage {...props} loading={props.loadingMeeting}>{props.meeting && <>
            {props.meeting.status >= EventStatus.RegistrationEvent && props.meeting.teams.length === 2 &&
                <div className='meeting__header'>
                    {props.meeting.attachments && props.meeting.attachments[0] && <>
                        <img className='meeting__header_bg' src={props.meeting.attachments[0].url} alt={props.meeting.attachments[0].filename}/>
                        <div className="meeting__header_bg_overlay"/>
                    </>}
                    <MeetingStatusTag status={props.meeting.status} className='meeting__header_status'/>
                    <h3 className='meeting__header_tournament' onClick={() => props.tournament && props.history.push(PATHS.tournaments.id(props.tournament.id))}>
                        {props.tournament ? props.tournament.name : 'Название турнира'}
                    </h3>
                    <img className='meeting__header_edit' src={EditIcon} alt={EditIcon}/>
                    <div className="meeting__header_container">
                        <MeetingTeamScore team={props.meeting.teams[0]} {...props}/>
                        <MeetingResult result={meetingResult(props.stats, props.meeting.teams)}/>
                        <MeetingTeamScore team={props.meeting.teams[1]} {...props}/>
                    </div>
                </div>
            }
            {props.meeting.status >= EventStatus.InProgressEvent && props.stats?.length > 0 &&
                <section className='meeting__scores'>
                    {statsPerTeam.map((stats, i) => <TeamScores key={i} team={props.meeting.teams[i]} stats={stats}/>)}
                </section>
            }
            <Space direction='vertical' size='large' className='full-width'>
                <Space direction='vertical' size='small'>
                    <Title level={3}>Статус встречи</Title>
                    <MeetingSteps current={props.meeting.status} />
                    {props.canEdit && (props.meeting.status !== EventStatus.FinishedEvent) &&
                        <Button type='primary' onClick={props.changeStatus}>Следующий этап</Button>
                    }
                </Space>
                {props.canEdit && props.meeting.status === EventStatus.InProgressEvent && (!props.stats || props.stats.length === 0) &&
                    <Space direction='vertical' size='small'>
                        <Title level={3}>Судейский мостик</Title>
                        <Button
                            type='primary'
                            onClick={showModal.bind(this, 'stats')}
                        >Закончить встречу и внести результаты</Button>
                        <AddResultsModal
                            meetingId={props.meeting.id}
                            teams={props.meeting.teams}
                            visible={isModalVisible['stats']}
                            onCancel={() => { handleCancel('stats') }}
                            handleOk={() => {
                                props.handlePointsSave();
                                handleOk('stats');
                            }}
                        />
                    </Space>
                }
                <Space direction='vertical' size='small'>
                    <Title level={3}>Фотографии</Title>
                    {props.meeting.attachments
                        ? <Space size={[8, 16]} wrap>
                            {props.meeting.attachments.map(attach => <img key={attach.id} height={100} alt={attach.filename} src={attach.url} />)}
                        </Space>
                        : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    }
                    {props.canEdit && <MeetingPictureWall meetingId={props.meeting.id} reload={props.reload}/>}
                </Space>
                {props.canEdit && props.meeting.status === EventStatus.RegistrationEvent && props.meeting.teams.length !== 2 && <>
                    <Button type='primary' onClick={() => { showModal('addTeams'); }}>Добавить команды</Button>
                    <AddTeamsModal
                        visible={isModalVisible['addTeams']}
                        onCancel={() => { handleCancel('addTeams'); }}
                        onOk={(teams) => {
                            props.handleTeamsAdd(teams);
                            handleOk('addTeams');
                        }}
                        tournamentId={props.meeting.tournamentId}
                    />
                </>}
            </Space>
        </>}</BasePage>
    )
}

export default MeetingPageRender;
