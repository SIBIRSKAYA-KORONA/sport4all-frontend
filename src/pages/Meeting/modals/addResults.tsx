import * as React from 'react';

import { Form, Modal, Input, Tabs, Row, Col, Table, message } from 'antd';
const { Item } = Form;
const { TabPane } = Tabs;

import { Team } from 'Utils/types';
import { initStats } from 'Utils/structUtils';


type IProps = {
    teams: Array<Team>,
    visible: boolean,
    handleOk: (stats) => void,
    onCancel: () => void,
}

const PLAYERS_TAB = '1';
const TEAMS_TAB = '2';

function AddResultsModal(props: IProps): JSX.Element {
    const [form] = Form.useForm();
    const [stats, setStats] = React.useState(initStats(props.teams));
    const [activeTab, setActiveTab] = React.useState(PLAYERS_TAB);
    const onOk = () => {
        if (activeTab === TEAMS_TAB) {
            form.validateFields()
                .then(values => {
                    form.resetFields();
                    props.handleOk(values);
                })
                .catch(e => message.error(e));
        } else {
            console.log(stats);
        }
    };
    const leftTeam = props.teams[0].players.map(player => ({ ...player, key:player.id }));
    const rightTeam = props.teams[1].players.map(player => ({ ...player, key:player.id }));
    const columns = [
        { title:'Никнейм', dataIndex:'nickname', key:'nickname' },
        {
            title:'Очки',
            key:'points',
            render: function InputCell(text, player) {
                return (<Input
                    value={stats[player.id]}
                    onChange={(e) => { setStats(prev => ({ ...prev, [player.id]:isNaN(+e.target.value) ? 0 : +e.target.value })); }}
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
