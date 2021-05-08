import './style.scss';
import * as React from 'react';

import { Button, Space } from 'antd';

import { PATHS } from 'Constants';
import { EventStatus, Meeting, Stats } from 'Utils/types';
import { meetingResult } from 'Utils/structUtils';
import BasePage from 'Components/BasePage/render';
import AddTeamsModal from 'Pages/Meeting/modals/addTeams';
import MeetingResult from 'Pages/Meeting/Components/Result/render';
import MeetingStatusTag from 'Components/Meeting/StatusTag/render';
import TeamScores from 'Pages/Meeting/Components/TeamScores/render';
import { IProps, visibleModals, visibleModalsKey } from './interface';
import MeetingTeamScore from 'Pages/Meeting/Components/TeamInTop/render';

import { ReactComponent as EditIcon } from 'Static/icons/edit.svg';
import MeetingEditModal from 'Pages/Meeting/modals/edit';
import MeetingPics from 'Pages/Meeting/Components/Pics/render';


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
                    {props.canEdit && <>
                        <EditIcon className='meeting__header_edit' onClick={showModal.bind(this, 'edit')}/>
                        <MeetingEditModal
                            meeting={props.meeting}
                            visible={isModalVisible['edit']}
                            onClose={(meeting:Meeting) => {
                                props.reload(meeting);
                                handleOk('edit');
                            }}
                            saveStats={props.saveStats}
                        />
                    </>}
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
            {props.meeting?.attachments?.length > 0 &&
                <section className='meeting__pics'>
                    <h3 className='meeting__pics_title'>Галерея</h3>
                    <MeetingPics attaches={props.meeting.attachments || []} perView={4} imgClass='meeting__pics_pic' carouselClass='meeting__pics_glide'/>
                </section>
            }
        </>}</BasePage>
    )
}

export default MeetingPageRender;
