import * as React from 'react';

import { Form, Modal, Input, Tabs, Row, Col } from 'antd';
const { Item } = Form;
const { TabPane } = Tabs;

import { Team } from 'Utils/types';


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
    // const [playersForm] = Form.useForm();
    const [activeTab, setActiveTab] = React.useState(PLAYERS_TAB);
    const onOk = () => {
        form.validateFields()
            .then(values => {
                form.resetFields();
                props.handleOk(values);
            })
            .catch(e => console.error(e));
    };

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
                        <Col span={12}>leftTeam
                            {/*<Table dataSource={leftTeam} columns={leftColumns} />*/}
                        </Col>
                        <Col span={12}>rightTeam</Col>
                    </Row>
                </TabPane>
            </Tabs>
        </Modal>
    )
}

export default AddResultsModal;
