import './style.scss';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Avatar, Button, Col, Row, Space, Typography } from 'antd';
const { Title } = Typography;

import BasePage from 'Components/BasePage/render';
import { EventStatus, Meeting, Stats } from 'Utils/types';
import AddTeamsModal from 'Pages/Meeting/modals/addTeams';
import MeetingSteps from 'Components/Meeting/Steps/render';
import AddResultsModal from 'Pages/Meeting/modals/addResults';
import { lettersForAvatar } from 'Utils/utils';



interface IProps extends RouteComponentProps {
    meeting?: Meeting,
    stats?: Array<Stats>,
    handlePointsSave: (stats: any) => void,
    handleTeamsAdd: (values:[any]) => void,
    changeStatus: () => void,
    loadingMeeting: boolean,
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
            ? <Space direction='vertical' size='large' className='meeting__section-center'>
                {props.meeting.status >= EventStatus.RegistrationEvent && props.meeting.teams.length === 2 &&
                    <Space direction='vertical' size='small' align='center'>
                        <Title level={2}>Результаты встречи</Title>
                        <Row justify='center'>
                            <Col span={8}>
                                <Space direction='vertical' size='middle' align='center'>
                                    <Avatar size={100}>{lettersForAvatar(props.meeting.teams[0].name)}</Avatar>
                                    <Title level={5} className='meeting__title'>{props.meeting.teams[0].name}</Title>
                                </Space>
                            </Col>
                            <Col span={8} className='meeting__result'>
                                <Title level={4} className='meeting__title'>
                                    {props.stats && props.stats.length === 2
                                        ? <>{props.stats.find(stat => stat.teamId === props.meeting.teams[0].id).score || 0} - {props.stats.find(stat => stat.teamId === props.meeting.teams[1].id).score || 0}</>
                                        : '0 - 0'
                                    }
                                </Title>
                            </Col>
                            <Col span={8}>
                                <Space direction='vertical' size='middle' align='center'>
                                    <Avatar size={100}>{lettersForAvatar(props.meeting.teams[1].name)}</Avatar>
                                    <Title level={5} className='meeting__title'>{props.meeting.teams[1].name}</Title>
                                </Space>
                            </Col>
                        </Row>
                    </Space>
                }
                <Space direction='vertical' size='small'>
                    <Title level={3}>Статус встречи</Title>
                    <MeetingSteps current={props.meeting.status} />
                    {props.meeting.status !== EventStatus.FinishedEvent &&
                        <Button type='primary' onClick={props.changeStatus}>Следующий этап</Button>
                    }
                </Space>
                {props.meeting.status === EventStatus.InProgressEvent && (!props.stats || props.stats.length === 0) &&
                    <Space direction='vertical' size='small'>
                        <Title level={3}>Судейский мостик</Title>
                        <Button
                            type='primary'
                            onClick={showModal.bind(this, 'stats')}
                        >Закончить встречу и внести результаты</Button>
                        <AddResultsModal
                            teams={props.meeting.teams}
                            visible={isModalVisible['stats']}
                            onCancel={() => { handleCancel('stats') }}
                            handleOk={(stats) => {
                                props.handlePointsSave(stats);
                                handleOk('stats');
                            }}
                        />
                    </Space>
                }
                {props.meeting.status === EventStatus.RegistrationEvent && props.meeting.teams.length !== 2 && <>
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
