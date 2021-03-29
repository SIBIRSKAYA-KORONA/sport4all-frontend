import './style.scss';
import * as React from 'react';
import propTypes from 'prop-types';

import { Form, Input, Button } from 'antd';

import BasePage from 'Components/BasePage/render';


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const SignUpPageRender = (props) => (
    <BasePage {...props}>
        <div className='signup'>
            <h1 className='signup__header'>Регистрация</h1>
            <Form {...layout} onFinish={props.onSubmit}>
                <Form.Item
                    label='Никнейм'
                    name='nickname'
                    validateStatus={props.error ? 'error' : ''}
                    help={props.error}
                    rules={[{
                        required: true,
                        message: 'Введите ваш никнейм'
                    }]}>
                    <Input/>
                </Form.Item>
                <Form.Item label='Пароль' name='password'
                    rules={[{
                        required: true,
                        message: 'Введите пароль'
                    }]}>
                    <Input.Password/>
                </Form.Item>
                <Form.Item label='Имя' name='name'
                    rules={[{
                        required: true,
                        message: 'Иван'
                    }]}>
                    <Input/>
                </Form.Item>
                <Form.Item label='Фамилия' name='surname'
                    rules={[{
                        required: true,
                        message: 'Иванов'
                    }]}>
                    <Input/>
                </Form.Item>
                <Form.Item label='Почта' name='email'
                    rules={[{
                        required: true,
                        message: 'ivan.ivanov@ivan.ivanov'
                    }]}>
                    <Input/>
                </Form.Item>
                <Form.Item label='О себе' name='about'
                    rules={[{
                        message: 'Заслуженный тренер РФ и Олимпийский чемпион по литрболу'
                    }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">Создать</Button>
                </Form.Item>
            </Form>
        </div>
    </BasePage>
);

SignUpPageRender.propTypes = {
    onSubmit: propTypes.func.isRequired,
    error: propTypes.string,
    loading: propTypes.bool.isRequired,
};

export default SignUpPageRender;
