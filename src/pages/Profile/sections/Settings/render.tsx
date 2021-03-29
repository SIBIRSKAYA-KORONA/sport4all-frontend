import * as React from 'react';
import { useState } from 'react';

import { Typography, Form, Input, Button, message } from 'antd';
const { Title } = Typography;

import { User } from 'Utils/types';


interface IProps {
    user: User
}

const SettingsProfileSection = (props:IProps):JSX.Element => {
    const [loading, setLoading] = useState(false);

    const saveInfo = (values) => {
        setLoading(true);
        console.log(values);
        setTimeout(() => {
            message.info('Метод не подключен');
            setLoading(false);
        }, 1000);
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    return (<>
        <Title level={2}>Настройки</Title>
        {props.user &&
            <Form
                {...layout}
                onFinish={saveInfo}
                initialValues={{...props.user}}
            >
                <Form.Item label='Имя' name='name' rules={[{ required: true, message: 'Иван' }]}>
                    <Input/>
                </Form.Item>
                <Form.Item label='Фамилия' name='surname' rules={[{ required: true, message: 'Иванов' }]}>
                    <Input/>
                </Form.Item>
                <Form.Item label='Никнейм' name='nickname' rules={[{ required: true, message: 'Введите ваш никнейм' }]}>
                    <Input/>
                </Form.Item>
                <Form.Item label='Почта' name='email' rules={[{ required: true, message: 'ivan.ivanov@ivan.ivanov' }]}>
                    <Input/>
                </Form.Item>
                <Form.Item label='О себе' name='about'
                    rules={[{ message: 'Заслуженный тренер РФ и Олимпийский чемпион по литрболу' }]}>
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>Сохранить</Button>
                </Form.Item>
            </Form>
        }
    </>);
};

export default SettingsProfileSection;
