import * as React from 'react';

import { Form, Modal, Input, Tabs, Row, Col, Table, message } from 'antd';
const { Item } = Form;
const { TabPane } = Tabs;

import { Stats, Team } from 'Utils/types';
import { initStats } from 'Utils/structUtils';
import MeetingModel from 'Models/MeetingModel';


type IProps = {
    meetingId: number,
    teams: Array<Team>,
    visible: boolean,
    handleOk: () => void,
    onCancel: () => void,
}

const PLAYERS_TAB = '1';
const TEAMS_TAB = '2';

function AddResultsModal(props: IProps): JSX.Element {
    const [form] = Form.useForm();
    const [stats, setStats] = React.useState(initStats(props.teams));
    const [activeTab, setActiveTab] = React.useState(TEAMS_TAB);

    const saveTeamsStats = (values):Promise<any[]> => {
        const arr = [];
        for (const key in values) if (Object.prototype.hasOwnProperty.call(values, key)) {
            const stats = {
                score: +values[key],
                meetingId: props.meetingId,
                teamId: +key,
            };
            arr.push(MeetingModel.addTeamResults(stats));
        }
        return Promise.all(arr);
    };

    const savePlayersStats = (stats):Promise<any[]> => {
        const arr = [];
        for (const [key, value] of Object.entries(stats)) {
            if (!value) continue;
            const team = props.teams.find(team => team.players.some(p => p.id === +key));
            if (!team) continue;
            const stata:Stats = {
                score: +value,
                meetingId: props.meetingId,
                playerId: +key,
                teamId: team.id,
            };
            arr.push(MeetingModel.addPlayerResults(stata));
        }
        return Promise.all(arr);
    };

    const onOk = () => {
        if (activeTab === TEAMS_TAB) {
            form.validateFields()
                .then(values => {
                    form.resetFields();
                    return saveTeamsStats(values);
                })
                .then(() => props.handleOk())
                .catch(e => message.error(e));
        } else {
            savePlayersStats(stats)
                .then(() => props.handleOk())
                .catch(e => message.error(e));
        }
    };
    const leftTeam = props.teams[0].players && props.teams[0].players.map(player => ({ ...player, key:player.id }));
    const rightTeam = props.teams[1].players &&  props.teams[1].players.map(player => ({ ...player, key:player.id }));
    const columns = [
        { title:'Никнейм', dataIndex:'nickname', key:'nickname' },
        {
            title:'Очки',
            key:'points',
            render: function InputCell(text, player) {
                return (<Input
                    value={stats[player.id]}
                    onChange={(e) => { setStats(prev => ({ ...prev, [player.id]:isNaN(+e.target.value) ? null : +e.target.value })); }}
                />);
            }
        }
    ];

    return (
        <Modal
            width='760px'
            title='Результаты матча'
            visible={props.visible}
            okText='Сохранить'
            cancelText='Отменить'
            onOk={onOk}
            onCancel={props.onCancel}
        >
            <h3>Внесите очки команд</h3>
            <Tabs activeKey={activeTab} onChange={(key) => { setActiveTab(key); }}>
                <TabPane key={TEAMS_TAB} tab='По командам'>
                    <Form form={form} layout='vertical'>
                        {props.teams.map(team => <Item key={team.id} label={team.name} name={team.id}>
                            <Input/>
                        </Item>)}
                    </Form>
                </TabPane>
                <TabPane key={PLAYERS_TAB} tab='По игрокам'>
                    <Row gutter={[12, 0]}>
                        <Col span={12}>
                            <Table dataSource={leftTeam} columns={columns} pagination={false}/>
                        </Col>
                        <Col span={12}>
                            <Table dataSource={rightTeam} columns={[...columns].reverse()} pagination={false}/>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
        </Modal>
    )
}

export default AddResultsModal;
