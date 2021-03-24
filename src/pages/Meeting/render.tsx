import './style.scss';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import {Button, Modal, Space, Table} from 'antd';

import {EventStatus, Meeting} from 'Utils/types';
import BasePage from 'Components/BasePage/render';
import AddTeamsModal from 'Pages/Meeting/modals/addTeams';


interface IProps extends RouteComponentProps {
    meeting: Meeting | null,
    leftTeam: Array<any>,
    rightTeam: Array<any>,
    handlePointsSave: (row: any) => void,
    handleTeamsAdd: (values:[any]) => void,
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

    // Table
    const columns = [
        { title:'Имя', dataIndex:'name', width:'25%' },
        { title:'Очки', dataIndex:'points', width:'25%', editable:true }
    ].map(col => {
        if (!col.editable) return col;
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: props.handlePointsSave,
            })
        }
    });
    const leftColumns = [...columns];
    const rightColumns = [...columns].reverse();

    return (
        <BasePage {...props} loading={props.loadingMeeting}>
            {props.meeting
                ? <>
                    <section className='meeting__section-center'>
                        <h1>{EventStatus[props.meeting.status]}</h1>
                    </section>
                    {props.meeting.teams.length > 0
                        ? <section>
                            <h3>Судейский мостик</h3>
                            <Button
                                type='primary'
                                onClick={showModal.bind(this, 'stats')}
                            >Закончить встречу и внести результаты</Button>
                            <Modal
                                title='Завершение матча'
                                visible={isModalVisible.stats}
                                onOk={handleOk.bind(this, 'stats')}
                                onCancel={handleCancel.bind(this, 'stats')}
                            >
                                <h3>Внесите очки команд</h3>
                                <Space direction='horizontal' size='small'>
                                    <Table dataSource={props.leftTeam} columns={leftColumns} pagination={false}></Table>
                                    <Table dataSource={props.rightTeam} columns={rightColumns} pagination={false}></Table>
                                </Space>
                                <Button
                                    type='primary'
                                    onClick={handleOk.bind(this, 'addTeams')}
                                >Сохранить</Button>
                            </Modal>
                        </section>
                        : <>
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
                </>
                : <p>Not found</p>
            }
        </BasePage>
    )
}

export default MeetingPageRender;
