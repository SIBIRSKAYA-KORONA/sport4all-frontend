import './style.scss';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Button, Space, Typography } from 'antd';
const { Title } = Typography;

import BasePage from 'Components/BasePage/render';
import { EventStatus, Meeting } from 'Utils/types';
import AddTeamsModal from 'Pages/Meeting/modals/addTeams';
import MeetingSteps from 'Components/Meeting/Steps/render';
import AddResultsModal from 'Pages/Meeting/modals/addResults';


interface IProps extends RouteComponentProps {
    meeting?: Meeting,
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
        <BasePage {...props} loading={props.loadingMeeting}>
            {props.meeting
                ? <Space direction='vertical'>
                    <Space direction='vertical'>
                        <Title level={3}>Статус встречи</Title>
                        <MeetingSteps current={props.meeting.status} />
                        {props.meeting.status !== EventStatus.FinishedEvent &&
                            <Button type='primary' onClick={props.changeStatus}>Следующий этап</Button>
                        }
                    </Space>
                    {props.meeting.status === EventStatus.InProgressEvent &&
                        <Space direction='vertical'>
                            <h3>Судейский мостик</h3>
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
                    {props.meeting.status === EventStatus.RegistrationEvent && <>
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
            }
        </BasePage>
    )
}

export default MeetingPageRender;

// todo: if teams are added but status is registration - change button title and checkboxes in modal

