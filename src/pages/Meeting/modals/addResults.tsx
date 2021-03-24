import * as React from 'react';

import { Form, Modal, Input } from 'antd';
const { Item } = Form;

import { Team } from 'Utils/types';


type IProps = {
    teams: Array<Team>,
    visible: boolean,
    handleOk: (stats) => void,
    onCancel: () => void,
}

function AddResultsModal(props: IProps): JSX.Element {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log(values);
    };
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
            title='Результаты матча'
            visible={props.visible}
            okText='Сохранить'
            cancelText='Отменить'
            onOk={onOk}
            onCancel={props.onCancel}
        >
            <h3>Внесите очки команд</h3>
            <Form onFinish={onFinish} form={form} layout='vertical'>
                {props.teams.map(team => <Item key={team.id} label={team.name} name={team.id}>
                    <Input/>
                </Item>)}
            </Form>
        </Modal>
    )
}

export default AddResultsModal;
