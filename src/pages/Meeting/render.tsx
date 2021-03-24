import './style.scss';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import {Button, Modal, Space, Table} from 'antd';

import BasePage from 'Components/BasePage/render';


interface IProps extends RouteComponentProps {
    meeting: any,
    leftTeam: Array<any>,
    rightTeam: Array<any>,
    handlePointsSave: (row: any) => void,
}

const MeetingPageRender = (props:IProps):JSX.Element => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const showModal = () => { setIsModalVisible(true); };
    const handleOk = () => { setIsModalVisible(false); };
    const handleCancel = () => { setIsModalVisible(false); };

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
        <BasePage {...props}>
            <section className='meeting__section-center'>
                <h1>{props.meeting.team1} - {props.meeting.team2}</h1>
            </section>
            <section>
                <h3>Судейский мостик</h3>
                <Button type='primary' onClick={showModal}>Закончить встречу и внести результаты</Button>
                <Modal title='Завершение матча' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <h3>Внесите очки команд</h3>
                    <Space direction='horizontal' size='small'>
                        <Table dataSource={props.leftTeam} columns={leftColumns} pagination={false}></Table>
                        <Table dataSource={props.rightTeam} columns={rightColumns} pagination={false}></Table>
                    </Space>
                    <Button type='primary' onClick={handleOk}>Сохранить</Button>
                </Modal>
            </section>
        </BasePage>
    )
}

export default MeetingPageRender;
