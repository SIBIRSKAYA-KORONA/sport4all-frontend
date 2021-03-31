import './style.scss';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Button, Carousel, Col, Empty, Image, Row, Space, Typography, Upload } from 'antd';
const { Title } = Typography;

import { meetingResult } from 'Utils/structUtils';
import BasePage from 'Components/BasePage/render';
import { EventStatus, Meeting, Stats } from 'Utils/types';
import AddTeamsModal from 'Pages/Meeting/modals/addTeams';
import MeetingSteps from 'Components/Meeting/Steps/render';
import AddResultsModal from 'Pages/Meeting/modals/addResults';
import MeetingTeamScore from 'Pages/Meeting/Components/TeamScore';
import { PlusOutlined } from '@ant-design/icons';
import MeetingPictureWall from 'Pages/Meeting/Components/PictureWall';



interface IProps extends RouteComponentProps {
    meeting?: Meeting,
    stats?: Array<Stats>,
    handlePointsSave: () => void,
    handleTeamsAdd: (values:[any]) => void,
    changeStatus: () => void,
    loadingMeeting: boolean,
    canEdit: boolean,
    reload: () => void
}

type visibleModals = {
    stats: boolean,
    addTeams: boolean
};
type visibleModalsKey = 'stats' | 'addTeams';

const MeetingPageRender = (props:IProps):JSX.Element => {
    const [isModalVisible, setIsModalVisible] = React.useState({} as visibleModals);

    const showModal = (key:visibleModalsKey) => { setIsModalVisible(prev => ({ ...prev, [key]:true })); };
    const handleOk = (key:visibleModalsKey) => { setIsModalVisible(prev => ({ ...prev, [key]:false })); };
    const handleCancel = (key:visibleModalsKey) => { setIsModalVisible(prev => ({ ...prev, [key]:false })); };

    return (
        <BasePage {...props} loading={props.loadingMeeting}>{props.meeting
            ? <Space direction='vertical' size='large'>
                {props.meeting.status >= EventStatus.RegistrationEvent && props.meeting.teams.length === 2 &&
                    <Space direction='vertical' size='small' align='center' className='meeting__section meeting__section-center'>
                        <Title level={2}>Результаты встречи</Title>
                        <Row justify='center'>
                            <Col span={8}>
                                <MeetingTeamScore team={props.meeting.teams[0]} stats={props.stats}/>
                            </Col>
                            <Col span={8} className='meeting__result'>
                                <Title level={4} className='meeting__title'>
                                    {meetingResult(props.stats, props.meeting.teams)}
                                </Title>
                            </Col>
                            <Col span={8}>
                                <MeetingTeamScore team={props.meeting.teams[1]} stats={props.stats}/>
                            </Col>
                        </Row>
                    </Space>
                }
                <Space direction='vertical' size='small'>
                    <Title level={3}>Статус встречи</Title>
                    <MeetingSteps current={props.meeting.status} />
                    {props.canEdit && (props.meeting.status !== EventStatus.FinishedEvent
                    && (props.meeting.status === EventStatus.InProgressEvent && props.stats && props.stats.length > 0)) &&
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
                        ? <Carousel autoplay>
                            {props.meeting.attachments.map(attach => <Image key={attach.id} height={150} src={attach.url}/>)}
                        </Carousel>
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
                        tournamentId={props.meeting.id}
                    />
                </>}
            </Space>
            : <p>Not found</p>
        }</BasePage>
    )
}

export default MeetingPageRender;
