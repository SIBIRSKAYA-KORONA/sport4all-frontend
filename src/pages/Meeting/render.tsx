import './style.scss';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Button, Col, Empty, Row, Space, Typography } from 'antd';
const { Title } = Typography;

import { PATHS } from 'Constants';
import { EventStatus } from 'Utils/types';
import { meetingResult } from 'Utils/structUtils';
import BasePage from 'Components/BasePage/render';
import AddTeamsModal from 'Pages/Meeting/modals/addTeams';
import MeetingSteps from 'Components/Meeting/Steps/render';
import AddResultsModal from 'Pages/Meeting/modals/addResults';
import MeetingTeamScore from 'Pages/Meeting/Components/TeamScore';
import MeetingPictureWall from 'Pages/Meeting/Components/PictureWall';
import { IProps, visibleModals, visibleModalsKey } from './interface';


const MeetingPageRender = (props:IProps):JSX.Element => {
    const [isModalVisible, setIsModalVisible] = React.useState({} as visibleModals);

    const showModal = (key:visibleModalsKey) => setIsModalVisible(prev => ({ ...prev, [key]:true }));
    const handleOk = (key:visibleModalsKey) => setIsModalVisible(prev => ({ ...prev, [key]:false }));
    const handleCancel = (key:visibleModalsKey) => setIsModalVisible(prev => ({ ...prev, [key]:false }));

    return (
        <BasePage {...props} loading={props.loadingMeeting}>{props.meeting
            ? <Space direction='vertical' size='large'>
                {props.meeting.status >= EventStatus.RegistrationEvent && props.meeting.teams.length === 2 &&
                    <Space direction='vertical' size='small' align='center' className='meeting__section meeting__section-center'>
                        <Title level={2}>Результаты встречи</Title>
                        <Row justify='center'>
                            <Col span={8}>
                                <MeetingTeamScore team={props.meeting.teams[0]} stats={props.stats} {...props}/>
                            </Col>
                            <Col span={8} className='meeting__result'>
                                <Title level={4} className='meeting__title'>
                                    {meetingResult(props.stats, props.meeting.teams)}
                                </Title>
                            </Col>
                            <Col span={8}>
                                <MeetingTeamScore team={props.meeting.teams[1]} stats={props.stats} {...props}/>
                            </Col>
                        </Row>
                        <Button type='link'>
                            <Link to={PATHS.tournaments.id(props.meeting.tournamentId)}>Турнир</Link>
                        </Button>
                    </Space>
                }
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
            : <p>Not found</p>
        }</BasePage>
    )
}

export default MeetingPageRender;
